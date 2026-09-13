import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { initialSeed } from '../src/utils/seedData';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Seed Users & Students
  for (const u of initialSeed.users) {
    const hashedPassword = await bcrypt.hash(u.passwordPlain, 10);

    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        id: u.id,
        name: u.name,
        email: u.email,
        password: hashedPassword,
        role: u.role,
        ...(u.student && {
          student: {
            create: {
              id: u.student.id,
              enrollmentNumber: u.student.enrollmentNumber,
              course: u.student.course,
              semester: u.student.semester,
              department: u.student.department,
            },
          },
        }),
      },
      include: { student: true },
    });

    // If student user, seed their attendance & tasks
    if (user.student) {
      for (const att of initialSeed.attendance) {
        await prisma.attendance.upsert({
          where: { id: att.id },
          update: {},
          create: {
            id: att.id,
            studentId: user.student.id,
            subject: att.subject,
            totalClasses: att.totalClasses,
            attendedClasses: att.attendedClasses,
            percentage: att.percentage,
          },
        });
      }

      for (const tsk of initialSeed.tasks) {
        await prisma.task.upsert({
          where: { id: tsk.id },
          update: {},
          create: {
            id: tsk.id,
            studentId: user.student.id,
            title: tsk.title,
            description: tsk.description,
            deadline: new Date(tsk.deadline),
            status: tsk.status,
            priority: tsk.priority,
          },
        });
      }
    }
  }

  // Seed Notices
  for (const not of initialSeed.notices) {
    await prisma.notice.upsert({
      where: { id: not.id },
      update: {},
      create: {
        id: not.id,
        title: not.title,
        content: not.content,
        category: not.category,
        authorId: 'usr_admin_01',
        authorName: not.authorName,
      },
    });
  }

  // Seed Timetable
  for (const tt of initialSeed.timetable) {
    await prisma.timetable.upsert({
      where: { id: tt.id },
      update: {},
      create: {
        id: tt.id,
        course: tt.course,
        semester: tt.semester,
        subject: tt.subject,
        faculty: tt.faculty,
        day: tt.day,
        startTime: tt.startTime,
        endTime: tt.endTime,
        room: tt.room,
      },
    });
  }

  console.log('✅ Database seeded successfully with demo students, admins, classes, and notices!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
