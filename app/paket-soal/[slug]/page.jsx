import { fetchAPI } from "@/lib";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormStoreAttempt from "@/components/ui/FormAttemptStore";

export default async function page({ params }) {
  const { slug } = await params;
  const { data: pkg } = await fetchAPI(
    process.env.NEXT_PUBLIC_API + `/package/${slug}`,
    null,
    null,
    1
  );

  return (
    <div className="px-5 md:px-0 mt-10 md:mt-12">
      <div className="max-w-xl mx-auto grid grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle> {pkg.name} </CardTitle>
            <CardDescription>Silahkan isi form berikut.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormStoreAttempt attemptId={pkg.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
