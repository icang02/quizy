"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ButtonDeletePackage({ packageId }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/admin/package/${id}/destroy`,
      { method: "DELETE" }
    );
    await fetch(process.env.NEXT_PUBLIC_URL + "/api/revalidate?tag=all", {
      method: "POST",
    });
    const data = await response.json();

    toast(data.message, {
      description: Date(),
      action: {
        label: "Tutup",
        onClick: () => "",
      },
    });
    router.replace("/dashboard/paket-soal");
    router.refresh();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild={true}>
        <Button size={"sm"} variant={"destructive"}>
          <Trash2 /> Hapus Paket
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus data?</AlertDialogTitle>
          <AlertDialogDescription>
            <b>Perhatian!</b> Seluruh data yang terkait dengan paket ini juga
            akan ikut terhapus. Klik tombol di bawah untuk melanjutkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild={true}>
            <Button onClick={() => handleDelete(packageId)}>Hapus</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
