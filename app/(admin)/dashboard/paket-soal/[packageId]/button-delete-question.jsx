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
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function ButtonDeleteQuestion({ questionId }) {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/admin/question/${questionId}/destroy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
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
    router.refresh();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild={true}>
        <Badge className="cursor-pointer" variant={"destructive"} size={"sm"}>
          <Trash size={15} />
        </Badge>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus data?</AlertDialogTitle>
          <AlertDialogDescription>
            <b>Perhatian!</b> Pernyataan ini akan dihapus. Klik tombol di bawah
            untuk melanjutkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild={true}>
            <Button onClick={handleDelete}>Hapus</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
