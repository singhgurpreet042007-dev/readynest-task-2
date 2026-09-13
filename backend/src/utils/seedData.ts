export interface InitialSeedData {
  users: Array<{
    id: string;
    name: string;
    email: string;
    passwordPlain: string;
    role: 'STUDENT' | 'ADMIN';
    student?: {
      id: string;
      enrollmentNumber: string;
      course: string;
      semester: string;
      department: string;
    };
  }>;
  attendance: Array<{
    id: string;
    subject: string;
    totalClasses: number;
    attendedClasses: number;
    percentage: number;
  }>;
  tasks: Array<{
    id: string;
    title: string;
    description: string;
    deadline: string;
    status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
  }>;
  notices: Array<{
    id: string;
    title: string;
    content: string;
    category: 'Academic' | 'Exams' | 'Events' | 'Urgent' | 'General';
    authorName: string;
    createdAt: string;
  }>;
  timetable: Array<{
    id: string;
    course: string;
    semester: string;
    subject: string;
    faculty: string;
    day: string;
    startTime: string;
    endTime: string;
    room: string;
  }>;
}

export const initialSeed: InitialSeedData = {
  users: [
    {
      id: 'usr_student_01',
      name: 'Aarav Sharma',
      email: 'student@campus.edu',
      passwordPlain: 'student123',
      role: 'STUDENT',
      student: {
        id: 'std_01',
        enrollmentNumber: '21BCSE104',
        course: 'B.Tech Computer Science & Engineering',
        semester: 'Semester 6',
        department: 'School of Computing & Data Sciences',
      },
    },
    {
      id: 'usr_admin_01',
      name: 'Dr. Rajesh Verma',
      email: 'admin@campus.edu',
      passwordPlain: 'admin123',
      role: 'ADMIN',
    },
  ],
  attendance: [
    {
      id: 'att_01',
      subject: 'Data Structures & Algorithms',
      totalClasses: 42,
      attendedClasses: 38,
      percentage: 90.5,
    },
    {
      id: 'att_02',
      subject: 'Cloud Computing & DevOps',
      totalClasses: 34,
      attendedClasses: 28,
      percentage: 82.4,
    },
    {
      id: 'att_03',
      subject: 'Artificial Intelligence & Neural Nets',
      totalClasses: 40,
      attendedClasses: 32,
      percentage: 80.0,
    },
    {
      id: 'att_04',
      subject: 'Database Management Systems',
      totalClasses: 32,
      attendedClasses: 24,
      percentage: 75.0,
    },
    {
      id: 'att_05',
      subject: 'Computer Networks & Security',
      totalClasses: 26,
      attendedClasses: 18,
      percentage: 69.2, // Below 75% to show warning threshold alert
    },
  ],
  tasks: [
    {
      id: 'tsk_01',
      title: 'Submit Cloud Architecture Infrastructure Lab',
      description: 'Implement Terraform script and deploy containerized microservice on Kubernetes cluster.',
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'IN_PROGRESS',
      priority: 'HIGH',
    },
    {
      id: 'tsk_02',
      title: 'Convolutional Neural Network Term Project',
      description: 'Train ResNet-50 on campus leaf disease dataset and submit benchmark evaluation PDF.',
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'TODO',
      priority: 'HIGH',
    },
    {
      id: 'tsk_03',
      title: 'DBMS B-Tree Indexing Optimization',
      description: 'Profile execution plans for 10M rows queries before and after composite indexing.',
      deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'COMPLETED',
      priority: 'MEDIUM',
    },
    {
      id: 'tsk_04',
      title: 'Graph Theory & Dijkstra Algorithm Problem Set',
      description: 'Complete questions 1-14 from Chapter 8 on competitive programming portal.',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'TODO',
      priority: 'LOW',
    },
  ],
  notices: [
    {
      id: 'not_01',
      title: 'Mid-Semester Examination Schedule Announced (Spring 2026)',
      content: 'The detailed date sheet for Mid-Term examinations is now published. Exams begin next Monday in Block C & D halls. Please carry your physical student ID card.',
      category: 'Exams',
      authorName: 'Office of the Controller of Examinations',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'not_02',
      title: 'HackCampus 2026: 36-Hour National Hackathon Registrations Open',
      content: 'Registrations are open for the annual hackathon with prize pool of $10,000. Tracks include AI/ML, FinTech, and Smart Campus Solutions. Form teams of 3-4 students.',
      category: 'Events',
      authorName: 'Center for Innovation & Entrepreneurship',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'not_03',
      title: 'Central Digital Library 24/7 Access for Exam Preparation',
      content: 'Starting this Wednesday, the central digital library will remain open 24/7 with quiet study zones, coffee dispensary, and high-speed Wi-Fi access.',
      category: 'Academic',
      authorName: 'Chief Librarian',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'not_04',
      title: 'Scheduled Campus Optical Fiber Maintenance on Saturday Night',
      content: 'Campus intranet and Wi-Fi will experience intermittent connectivity between 1:00 AM and 5:00 AM on Saturday for high-speed 10Gbps optical backbone upgrades.',
      category: 'Urgent',
      authorName: 'Campus IT Infrastructure Cell',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  timetable: [
    {
      id: 'tt_01',
      course: 'B.Tech CSE',
      semester: 'Semester 6',
      subject: 'Data Structures & Algorithms',
      faculty: 'Prof. Ananya Sen',
      day: 'Monday',
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      room: 'Lecture Hall 101',
    },
    {
      id: 'tt_02',
      course: 'B.Tech CSE',
      semester: 'Semester 6',
      subject: 'Cloud Computing & DevOps',
      faculty: 'Dr. Vikram Malhotra',
      day: 'Monday',
      startTime: '11:00 AM',
      endTime: '12:30 PM',
      room: 'Cloud Computing Lab 3',
    },
    {
      id: 'tt_03',
      course: 'B.Tech CSE',
      semester: 'Semester 6',
      subject: 'Artificial Intelligence',
      faculty: 'Dr. Meera Iyer',
      day: 'Tuesday',
      startTime: '09:30 AM',
      endTime: '11:00 AM',
      room: 'Turing Auditorium',
    },
    {
      id: 'tt_04',
      course: 'B.Tech CSE',
      semester: 'Semester 6',
      subject: 'Database Systems Lab',
      faculty: 'Prof. R. K. Gupta',
      day: 'Wednesday',
      startTime: '01:30 PM',
      endTime: '03:30 PM',
      room: 'Lab Complex B-204',
    },
    {
      id: 'tt_05',
      course: 'B.Tech CSE',
      semester: 'Semester 6',
      subject: 'Computer Networks',
      faculty: 'Prof. Sunita Rao',
      day: 'Thursday',
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      room: 'Lecture Hall 103',
    },
    {
      id: 'tt_06',
      course: 'B.Tech CSE',
      semester: 'Semester 6',
      subject: 'Capstone Project Review',
      faculty: 'Academic Committee',
      day: 'Friday',
      startTime: '02:00 PM',
      endTime: '04:00 PM',
      room: 'Seminar Hall 4',
    },
  ],
};
