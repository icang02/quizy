import Link from "next/link";

import { CircleHelp, Clock, RefreshCw } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import FormAddPackage from "./form-add-package";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default async function page() {
  const response = await fetch(process.env.NEXT_PUBLIC_API + "/packages", {
    next: {
      tags: ["all"],
    },
  });
  const { data: packages } = await response.json();

  return (
    <>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild={true}>
                <Link href={"/dashboard"}>Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Paket Soal</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex h-5 items-center space-x-4 text-sm">
          <Link href={"/dashboard/paket-soal"}>
            <Button size="sm" variant="outline">
              <RefreshCw /> Refresh
            </Button>
          </Link>
          <Separator orientation="vertical" />
          <FormAddPackage />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {packages?.map((pkg, index) => (
          <Link key={index} href={`/dashboard/paket-soal/${pkg.id}`}>
            <Card className="hover:shadow-md hover:border hover:border-green-300 transition-all">
              <CardHeader>
                <CardTitle className="grid grid-cols-12">
                  <div className="col-span-11">
                    <h5 className="uppercase text-sm">{pkg.name}</h5>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 font-normal">
                        {pkg.description}
                      </p>
                      <div className="mt-5 flex items-center justify-between">
                        <div className="flex items-center gap-x-2">
                          <span className="text-sm text-green-500 font-semibold">
                            <Clock size={15} />
                          </span>
                          <span className="text-xs text-gray-400">
                            Updated 2hr ago
                          </span>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <span className="text-sm text-green-500 font-semibold">
                            <CircleHelp size={15} />
                          </span>
                          <span className="text-xs text-gray-400">
                            {pkg.questions.length} nomor soal
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <span className="text-xl md:text-2xl text-gray-600">
                      #0{index + 1}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
