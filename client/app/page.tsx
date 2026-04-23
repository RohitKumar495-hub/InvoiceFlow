import Table from "@/components/Table";

export default function Home() {
  return (
    <div className="grid">
      <div className="grid gap-3">
        <h1 className="font-semibold text-center text-lg">Invoice History</h1>
        <Table />
      </div>
    </div>
  );
}
