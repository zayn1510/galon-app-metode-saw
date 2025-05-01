"use client";
import { Table, Card, Progress, Tag } from "antd";
import { InfoCircleOutlined, TrophyOutlined } from "@ant-design/icons";

// Tipe untuk data di dataSource
interface Product {
  key: string;
  name: string;
  price: number;
  distance: number;
  discount: number;
  rating: number;
  weight: number;
  rank: number;
}

const SAWMethodVisualization = () => {
  // Data Alternatif Galon dengan tipe yang telah didefinisikan
  const dataSource: Product[] = [
    {
      key: "1",
      name: "Aqua",
      price: 18000,
      distance: 2.5, // km
      discount: 10, // %
      rating: 4.7,
      weight: 0.35, // Bobot akhir SAW
      rank: 1,
    },
    {
      key: "2",
      name: "Le Minerale",
      price: 16500,
      distance: 3.2,
      discount: 5,
      rating: 4.3,
      weight: 0.28,
      rank: 3,
    },
    {
      key: "3",
      name: "Vit",
      price: 17000,
      distance: 1.8,
      discount: 15,
      rating: 4.5,
      weight: 0.32,
      rank: 2,
    },
  ];

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      render: (rank: number) => (
        <Tag
          color={rank === 1 ? "gold" : rank === 2 ? "blue" : "green"}
          icon={rank === 1 ? <TrophyOutlined /> : null}
        >
          #{rank}
        </Tag>
      ),
    },
    {
      title: "Merek",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Harga",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `Rp${price.toLocaleString()}`,
      sorter: (a: Product, b: Product) => a.price - b.price, // Ganti `any` dengan `Product`
    },
    {
      title: "Jarak",
      dataIndex: "distance",
      key: "distance",
      render: (distance: number) => `${distance} km`,
      sorter: (a: Product, b: Product) => a.distance - b.distance, // Ganti `any` dengan `Product`
    },
    {
      title: "Diskon",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => <Tag color="#87d068">{discount}%</Tag>,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <Progress
          percent={rating * 20}
          strokeColor="#1890ff"
          format={() => rating.toFixed(1)}
          size="small"
        />
      ),
    },
    {
      title: "Skor SAW",
      dataIndex: "weight",
      key: "weight",
      render: (weight: number) => (
        <div className="flex items-center">
          <Progress
            percent={weight * 100}
            strokeColor="#722ed1"
            showInfo={false}
            className="mr-2"
          />
          <span>{(weight * 100).toFixed(1)}</span>
        </div>
      ),
      sorter: (a: Product, b: Product) => a.weight - b.weight, // Ganti `any` dengan `Product`
    },
  ];

  // Bobot Kriteria
  const criteriaWeights = [
    { name: "Harga", weight: 0.4, type: "cost" },
    { name: "Jarak", weight: 0.3, type: "cost" },
    { name: "Diskon", weight: 0.15, type: "benefit" },
    { name: "Rating", weight: 0.15, type: "benefit" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Metode SAW
          </span>
        </h1>
        <p className="text-gray-600 mt-2">
          Simple Additive Weighting untuk Rekomendasi Galon Terbaik
        </p>
      </div>

      {/* Visualisasi Bobot Kriteria */}
      <Card title="Parameter Kriteria" className="mb-6 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {criteriaWeights.map((criteria) => (
            <div key={criteria.name} className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">{criteria.name}</span>
                <Tag color={criteria.type === "cost" ? "red" : "green"}>
                  {criteria.type.toUpperCase()}
                </Tag>
              </div>
              <Progress
                percent={criteria.weight * 100}
                strokeColor={criteria.type === "cost" ? "#ff4d4f" : "#52c41a"}
                className="mt-2"
              />
              <div className="text-right mt-1 text-gray-500">
                Bobot: {(criteria.weight * 100).toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tabel Hasil */}
      <Card
        title="Hasil Perhitungan SAW"
        className="shadow-sm"
        extra={
          <Tag icon={<InfoCircleOutlined />} color="blue">
            Nilai tertinggi = Rekomendasi terbaik
          </Tag>
        }
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          rowClassName={(record) => record.rank === 1 ? "highlight-row" : ""}
        />
      </Card>

      {/* Penjelasan Metode */}
      <Card className="mt-6 shadow-sm">
        <h3 className="font-bold text-lg mb-4">Alur Perhitungan:</h3>
        <div className="space-y-4">
          <StepItem
            number={1}
            title="Normalisasi Matriks"
            content="Mengubah nilai kriteria ke skala 0-1"
          />
          <StepItem
            number={2}
            title="Pembobotan"
            content="Mengalikan nilai normalisasi dengan bobot kriteria"
          />
          <StepItem
            number={3}
            title="Penjumlahan Terbobot"
            content="Menjumlahkan semua nilai kriteria untuk setiap alternatif"
          />
        </div>
      </Card>
    </div>
  );
};

const StepItem = ({
  number,
  title,
  content,
}: {
  number: number;
  title: string;
  content: string;
}) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 mt-0.5">
      {number}
    </div>
    <div>
      <h4 className="font-medium text-gray-800">{title}</h4>
      <p className="text-gray-600">{content}</p>
    </div>
  </div>
);

export default SAWMethodVisualization;
