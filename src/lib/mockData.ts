// Mock data for the hospital scheduling system

export interface Doctor {
  id: string;
  name: string;
  department: string;
  profileImg: string;
  specialization: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'booked' | 'cancelled' | 'completed' | 'noshow';
  memo: string;
}

export const departments = [
  { id: 'internal', name: '내과', icon: '🫀' },
  { id: 'orthopedics', name: '정형외과', icon: '🦴' },
  { id: 'dermatology', name: '피부과', icon: '🧴' },
  { id: 'pediatrics', name: '소아청소년과', icon: '👶' },
  { id: 'ophthalmology', name: '안과', icon: '👁️' },
  { id: 'ent', name: '이비인후과', icon: '👂' },
];

export const doctors: Doctor[] = [
  { id: 'd1', name: '김민수', department: 'internal', profileImg: '', specialization: '소화기내과 전문의' },
  { id: 'd2', name: '이서연', department: 'internal', profileImg: '', specialization: '호흡기내과 전문의' },
  { id: 'd3', name: '박준호', department: 'orthopedics', profileImg: '', specialization: '관절 전문의' },
  { id: 'd4', name: '최유진', department: 'dermatology', profileImg: '', specialization: '피부미용 전문의' },
  { id: 'd5', name: '정하늘', department: 'pediatrics', profileImg: '', specialization: '소아 알레르기 전문의' },
  { id: 'd6', name: '한지민', department: 'ophthalmology', profileImg: '', specialization: '백내장/녹내장 전문의' },
];

export const generateTimeSlots = (date: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const morningStart = 9;
  const morningEnd = 12;
  const afternoonStart = 13;
  const afternoonEnd = 17;

  for (let h = morningStart; h < morningEnd; h++) {
    for (let m = 0; m < 60; m += 30) {
      const available = Math.random() > 0.3;
      slots.push({
        time: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`,
        available,
      });
    }
  }
  for (let h = afternoonStart; h < afternoonEnd; h++) {
    for (let m = 0; m < 60; m += 30) {
      const available = Math.random() > 0.35;
      slots.push({
        time: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`,
        available,
      });
    }
  }
  return slots;
};

export const mockAppointments: Appointment[] = [
  {
    id: 'a1', patientName: '홍길동', patientPhone: '010-1234-5678',
    doctorId: 'd1', doctorName: '김민수', department: '내과',
    date: '2026-03-09', startTime: '09:00', endTime: '09:30',
    status: 'booked', memo: '복통 증상',
  },
  {
    id: 'a2', patientName: '이영희', patientPhone: '010-2345-6789',
    doctorId: 'd1', doctorName: '김민수', department: '내과',
    date: '2026-03-09', startTime: '10:00', endTime: '10:30',
    status: 'booked', memo: '정기 검진',
  },
  {
    id: 'a3', patientName: '박철수', patientPhone: '010-3456-7890',
    doctorId: 'd3', doctorName: '박준호', department: '정형외과',
    date: '2026-03-09', startTime: '11:00', endTime: '11:30',
    status: 'completed', memo: '무릎 통증',
  },
  {
    id: 'a4', patientName: '김수진', patientPhone: '010-4567-8901',
    doctorId: 'd4', doctorName: '최유진', department: '피부과',
    date: '2026-03-09', startTime: '14:00', endTime: '14:30',
    status: 'cancelled', memo: '여드름 상담',
  },
  {
    id: 'a5', patientName: '정민호', patientPhone: '010-5678-9012',
    doctorId: 'd2', doctorName: '이서연', department: '내과',
    date: '2026-03-10', startTime: '09:30', endTime: '10:00',
    status: 'booked', memo: '기침 2주째 지속',
  },
  {
    id: 'a6', patientName: '오수민', patientPhone: '010-6789-0123',
    doctorId: 'd5', doctorName: '정하늘', department: '소아청소년과',
    date: '2026-03-10', startTime: '15:00', endTime: '15:30',
    status: 'booked', memo: '아이 피부 발진',
  },
];
