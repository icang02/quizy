import Link from "next/link";

import {
  ArrowDownUp,
  ArrowUpDown,
  EllipsisVertical,
  FilePenLine,
  Plus,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import ButtonDeletePackage from "./buttton-delete-package";
import TableColAnswer from "./table-col-answer";

export default async function page({ params }) {
  const { packageId } = await params;
  const response = await fetch(
    process.env.NEXT_PUBLIC_API + `/admin/package/${packageId}`,
    {
      next: {
        tags: ["all"],
      },
    }
  );
  const { data: pkg } = await response.json();

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
              <BreadcrumbLink asChild={true}>
                <Link href={"/dashboard/paket-soal"}>Paket Soal</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Paket</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex h-5 items-center space-x-4 text-sm">
          <Button size={"sm"}>
            <Plus /> Tambah Soal
          </Button>
          <Separator orientation="vertical" />
          <div className="flex space-x-1">
            {/* <FormEditPackage
              id={pkg.id}
              name={pkg.name}
              description={pkg.description}
            />*/}
            <ButtonDeletePackage packageId={pkg.id} />
          </div>
        </div>
      </div>

      <div className="mt-7">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {pkg.name}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisVertical className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <ArrowUpDown />
                      <span>Ascending</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ArrowDownUp />
                      <span>Descending</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>List soal {pkg.name}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">#</TableHead>
                  <TableHead>Soal</TableHead>
                  <TableHead>Jawaban</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pkg.questions.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{item.question}</TableCell>
                    <TableCell>
                      <TableColAnswer
                        index={index}
                        answer={
                          item.answers.find((a) => a.is_correct)?.answer || null
                        }
                      />
                    </TableCell>
                    <TableCell className="text-right text-nowrap">
                      <Button variant={"warning"} size={"sm"} className="me-1">
                        <FilePenLine />
                      </Button>
                      {/* <ButtonDeleteQuestion packageId={item.id} /> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
