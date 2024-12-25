export interface IOrder {
    user_id: number;
    price_plan_id: number;
    first_name: string;
    last_name: string;
    street_address: string;
    city: string;
    zip: string;
    country: string;
    role: string;
    phone: string;
    email: string;
    password: string;
    alt_first_name: string;
    alt_last_name: string;
    alt_street_address: string;
    alt_city: string;
    alt_zip: string;
    alt_country: string;
    alt_phone: string;
    alt_email: string;
    payment_method: string;
  }