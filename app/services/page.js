"use client";
import { CloudSun, HelpCircle, ShieldAlert, Users } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const services = [
  {
    icon: CloudSun,
    title: "Informasi Cuaca & Gempa",
    description:
      "Data real-time dari BMKG yang disederhanakan oleh AI agar mudah dipahami oleh masyarakat dan anggota komunitas.",
  },
  {
    icon: ShieldAlert,
    title: "Pelaporan & Aduan Bencana",
    description:
      "Fitur chatbot pelaporan cepat untuk meminta bantuan langsung serta memantau status penanganan secara real-time.",
  },
  {
    icon: Users,
    title: "Aksi Komunitas & Tantangan",
    description:
      "Program aksi iklim preventif dan mitigasi bencana komunal yang dirancang untuk menggerakkan peran aktif perempuan.",
  },
];

export default function ServicesPage() {
  return (
    <section className="relative bg-[#F8F9FA] text-[#111827]">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10 opacity-30" />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E6008A]/20 bg-[#E6008A]/10 px-3.5 py-1 text-xs font-semibold text-[#E6008A]">
            <HelpCircle className="size-3.5 text-[#E6008A]" />
            Layanan & Fitur Utama
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#111827] md:text-5xl">
            Layanan Platform PARAS
          </h1>
          <p className="mt-4 text-[#111827]/70">
            Fasilitas terintegrasi untuk mendukung pemberdayaan perempuan dalam pemantauan informasi iklim, pelaporan darurat, serta aksi tanggap bencana.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="group relative overflow-hidden border border-[#111827]/10 bg-white transition-all hover:-translate-y-1 hover:border-[#159038]/40 hover:shadow-xl hover:shadow-[#159038]/10"
            >
              <CardHeader>
                <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-[#159038]/10 text-[#159038] transition-colors group-hover:bg-[#159038] group-hover:text-white">
                  <Icon className="size-5" />
                </div>
                <CardTitle className="text-lg font-bold text-[#111827]">
                  {title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed text-[#111827]/70">
                  {description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}