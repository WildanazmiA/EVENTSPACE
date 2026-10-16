import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Script ini berdiri sendiri (dijalankan lewat tsx, bukan lewat Next.js),
// jadi sengaja tidak mengimpor apa pun dari lib/ yang memakai "server-only".
const prisma = new PrismaClient();

function daysFromNow(days: number, hour = 0) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, 0, 0, 0);
  return d;
}

async function upsertUser(email: string, name: string, password: string, role: "ADMIN" | "USER") {
  const hashed = await bcrypt.hash(password, 12);
  return prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name, password: hashed, role },
  });
}

async function main() {
  const admin = await upsertUser("admin@eventspace.test", "Admin EventSpace", "Admin123!", "ADMIN");
  await upsertUser("user@eventspace.test", "Pengguna Uji", "User123!", "USER");

  const events = [
    {
      title: "Samarinda Jazz Night 2026",
      category: "Musik",
      location: "Taman Samarendah",
      city: "Samarinda",
      address: "Jl. Gajah Mada, Tepian Mahakam, Samarinda",
      latitude: -0.4946,
      longitude: 117.1436,
      description:
        "Malam musik jazz dengan musisi lokal dan nasional di tepian Sungai Mahakam. Cocok untuk kamu yang ingin menikmati akhir pekan dengan suasana santai.",
      start: daysFromNow(14, 19),
      end: daysFromNow(14, 22),
      startTime: "19:00",
      endTime: "22:00",
      organizer: "Komunitas Jazz Kaltim",
      price: 75000,
      ticketUrl: "https://tiket.example.com/jazz-night",
      status: "PUBLISHED" as const,
    },
    {
      title: "Workshop UI/UX untuk Pemula",
      category: "Workshop",
      location: "Gedung Serbaguna UMKT",
      city: "Samarinda",
      address: "Jl. Ir. H. Juanda, Samarinda",
      latitude: -0.4818,
      longitude: 117.1498,
      description:
        "Belajar dasar UI/UX design dari riset pengguna sampai prototyping, cocok untuk mahasiswa dan pemula yang baru mulai belajar desain produk digital.",
      start: daysFromNow(3, 9),
      end: daysFromNow(3, 15),
      startTime: "09:00",
      endTime: "15:00",
      organizer: "UMKT Creative Club",
      price: 0,
      ticketUrl: null,
      status: "PUBLISHED" as const,
    },
    {
      title: "Festival Kuliner Tepian Mahakam",
      category: "Kuliner",
      location: "Kawasan Tepian Mahakam",
      city: "Samarinda",
      address: "Jl. Yos Sudarso, Samarinda",
      latitude: -0.4931,
      longitude: 117.1464,
      description:
        "Festival kuliner khas Kalimantan Timur dengan puluhan tenant lokal, live music, dan area bermain anak. Gratis masuk untuk pengunjung.",
      start: daysFromNow(30, 16),
      end: daysFromNow(32, 22),
      startTime: "16:00",
      endTime: "22:00",
      organizer: "Dinas Pariwisata Samarinda",
      price: 0,
      ticketUrl: null,
      status: "PUBLISHED" as const,
    },
    {
      title: "Seminar Karier IT 2026",
      category: "Seminar",
      location: "Auditorium Kampus",
      city: "Samarinda",
      address: "Jl. Ki Hajar Dewantara, Samarinda",
      latitude: -0.4699,
      longitude: 117.1253,
      description:
        "Seminar persiapan karier di bidang teknologi informasi, membahas roadmap belajar, sertifikasi, dan tips wawancara kerja dari praktisi industri.",
      start: daysFromNow(21, 9),
      end: daysFromNow(21, 12),
      startTime: "09:00",
      endTime: "12:00",
      organizer: "HIMATIF UMKT",
      price: 25000,
      ticketUrl: "https://tiket.example.com/seminar-karier-it",
      status: "PUBLISHED" as const,
    },
    {
      title: "Fun Run Samarinda 10K",
      category: "Olahraga",
      location: "Stadion Madya Sempaja",
      city: "Samarinda",
      address: "Jl. Kadrie Oening, Samarinda",
      latitude: -0.4544,
      longitude: 117.1372,
      description:
        "Lari santai 10K mengelilingi rute dalam kota Samarinda, dengan water station di tiap 2 kilometer dan doorprize menarik di garis akhir.",
      start: daysFromNow(5, 6),
      end: daysFromNow(5, 10),
      startTime: "06:00",
      endTime: "10:00",
      organizer: "Komunitas Lari Samarinda",
      price: 100000,
      ticketUrl: "https://tiket.example.com/funrun-10k",
      status: "PUBLISHED" as const,
    },
    {
      title: "Komunitas Baca Buku Kaltim",
      category: "Komunitas",
      location: "Perpustakaan Daerah",
      city: "Tenggarong",
      address: "Jl. Danau Aji, Tenggarong",
      latitude: -0.4295,
      longitude: 117.0004,
      description:
        "Diskusi buku bulanan terbuka untuk umum. Bulan ini membahas tema literasi digital. Datang saja, tidak perlu daftar di muka.",
      start: daysFromNow(10, 15),
      end: daysFromNow(10, 17),
      startTime: "15:00",
      endTime: "17:00",
      organizer: "Komunitas Baca Kaltim",
      price: 0,
      ticketUrl: null,
      status: "PUBLISHED" as const,
    },
    {
      title: "Pameran Seni Rupa Borneo",
      category: "Lainnya",
      location: "Balikpapan Creative Hub",
      city: "Balikpapan",
      address: "Jl. Jenderal Sudirman, Balikpapan",
      latitude: null,
      longitude: null,
      description:
        "Pameran karya seniman muda Kalimantan, menampilkan lukisan, instalasi, dan fotografi dengan tema kearifan lokal Borneo.",
      start: daysFromNow(18, 10),
      end: daysFromNow(25, 20),
      startTime: "10:00",
      endTime: "20:00",
      organizer: "Komunitas Seni Borneo",
      price: 20000,
      ticketUrl: null,
      status: "PUBLISHED" as const,
    },
    {
      title: "Konser Amal Peduli Kaltim",
      category: "Musik",
      location: "GOR Bessai Berinta",
      city: "Bontang",
      address: "Jl. Imam Bonjol, Bontang",
      latitude: null,
      longitude: null,
      description:
        "Konser amal untuk penggalangan dana bencana. Draft, masih menunggu konfirmasi lineup musisi sebelum dipublikasikan.",
      start: daysFromNow(40, 19),
      end: daysFromNow(40, 23),
      startTime: "19:00",
      endTime: "23:00",
      organizer: "Panitia Peduli Kaltim",
      price: 50000,
      ticketUrl: null,
      status: "DRAFT" as const,
    },
    {
      title: "Tech Talk: AI untuk Mahasiswa",
      category: "Seminar",
      location: "Ruang Auditorium",
      city: "Samarinda",
      address: "Jl. Juanda, Samarinda",
      latitude: -0.4818,
      longitude: 117.1498,
      description:
        "Dibatalkan karena pembicara berhalangan hadir. Akan dijadwalkan ulang dan diumumkan lewat media sosial penyelenggara.",
      start: daysFromNow(8, 13),
      end: daysFromNow(8, 16),
      startTime: "13:00",
      endTime: "16:00",
      organizer: "HIMATIF UMKT",
      price: 0,
      ticketUrl: null,
      status: "CANCELLED" as const,
    },
    {
      title: "Car Free Day Samarinda",
      category: "Olahraga",
      location: "Jalan Pahlawan",
      city: "Samarinda",
      address: "Jl. Pahlawan, Samarinda",
      latitude: -0.4877,
      longitude: 117.1535,
      description:
        "Car free day rutin tiap akhir pekan dengan senam bersama, bazar UMKM, dan panggung hiburan untuk warga Samarinda.",
      start: daysFromNow(-20, 6),
      end: daysFromNow(-20, 10),
      startTime: "06:00",
      endTime: "10:00",
      organizer: "Pemkot Samarinda",
      price: 0,
      ticketUrl: null,
      status: "FINISHED" as const,
    },
  ];

  for (const e of events) {
    const slug = e.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    await prisma.event.upsert({
      where: { slug },
      update: {},
      create: {
        title: e.title,
        slug,
        description: e.description,
        image: `https://picsum.photos/seed/${slug}/800/600`,
        category: e.category,
        location: e.location,
        city: e.city,
        address: e.address,
        latitude: e.latitude,
        longitude: e.longitude,
        startDate: e.start,
        endDate: e.end,
        startTime: e.startTime,
        endTime: e.endTime,
        organizer: e.organizer,
        price: e.price,
        ticketUrl: e.ticketUrl,
        status: e.status,
        createdById: admin.id,
      },
    });
  }

  console.log(`Seed selesai: 2 user, ${events.length} event.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });