export type Field = {
  id: string;
  name: string;
  location: string;
  description?: string | null;
  image?: string | null;
  pricePerHour: number;
  category: string;
  operationalHour?: string | null;
  capacity: number;
  status?: string | null;
};

export type FieldPage = {
  data: Field[];
  paging: {
    size: number;
    total_page: number;
    current_page: number;
  };
};
