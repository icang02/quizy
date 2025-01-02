"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function FormAddPackage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    startTransition(async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API + "/admin/package/store",
        {
          method: "POST",
          body: JSON.stringify({ package: form }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await fetch(process.env.NEXT_PUBLIC_URL + "/api/revalidate?tag=all", {
        method: "POST",
      });

      const { message } = await response.json();
      console.log(message);

      toast(message, {
        description: Date(),
        action: {
          label: "Tutup",
          onClick: () => "",
        },
      });

      setForm({
        name: "",
        description: "",
      });

      setIsOpen(false);
      router.refresh();
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} type="button" size={"sm"}>
          <Plus /> Tambah
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Tambah Paket Soal</DialogTitle>
            <DialogDescription>Isi data lalu klik simpan.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nama Paket
              </Label>
              <Input
                onChange={handleChange}
                id="name"
                value={form.name}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Deskripsi
              </Label>
              <Textarea
                onChange={handleChange}
                id="description"
                rows={4}
                value={form.description}
                className="col-span-3"
                required
                maxLength={120}
              />
            </div>
          </div>
          <DialogFooter>
            <Button disabled={isPending} type="submit">
              Simpan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
