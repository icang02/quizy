import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ShieldQuestion, UserCheck } from "lucide-react";

export default function page() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <div>
                <h5 className="uppercase text-sm">Paket Soal</h5>
                <div className="mt-3">
                  <h1 className="text-2xl font-bold">#24k</h1>
                  <div className="mt-2">
                    <span className="text-sm me-3 text-green-500 font-semibold">
                      12%
                    </span>
                    <span className="text-sm text-gray-400">
                      Since last month
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <BookOpen size={35} className="text-gray-600" />
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <div>
                <h5 className="uppercase text-sm">Total Soal</h5>
                <div className="mt-3">
                  <h1 className="text-2xl font-bold">#22k</h1>
                  <div className="mt-2">
                    <span className="text-sm me-3 text-green-500 font-semibold">
                      12%
                    </span>
                    <span className="text-sm text-gray-400">
                      Since last month
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <ShieldQuestion size={35} className="text-gray-600" />
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <div>
                <h5 className="uppercase text-sm">Users</h5>
                <div className="mt-3">
                  <h1 className="text-2xl font-bold">#100k</h1>
                  <div className="mt-2">
                    <span className="text-sm me-3 text-green-500 font-semibold">
                      22%
                    </span>
                    <span className="text-sm text-gray-400">
                      Since last month
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <UserCheck size={35} className="text-gray-600" />
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
