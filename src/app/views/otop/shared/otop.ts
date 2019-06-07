export interface Otop {
  id: number;
  code_name: string;
  name: string;
  description: string;
  price: number;
  category_id: number;
  store_id: number;
  sub_district_id: number;
  images: Array<any>;
  tags: string;
  note: string;
}
