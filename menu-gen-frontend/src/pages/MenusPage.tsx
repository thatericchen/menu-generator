import * as React from 'react';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Link,
    Image,
  } from "@nextui-org/react";

export interface Menu {
  _id: string;
  restaurant_name: string;
  restaurant_slogan: string;
  restaurant_logo_url: string;
  restaurant_logo_path: string;
  owner: string;
  food_items: FoodItem[];
}

export interface FoodItem {
  title: string;
  description: string;
  price: string;
  dietary_restrictions: string;
  vegetarian: boolean;
  spicy: boolean;
  gluten_free: boolean;
  picture_url: string;
  picture_path: string;
}

const MenusPage = () => {
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await fetch(import.meta.env["VITE_BACKEND_URI"] + '/menus', {
        method: 'GET',
        headers: {
          'x-access-token': localStorage.token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMenus(data);
      } else {
        console.error('Failed to fetch menus');
      }
    } catch (error) {
      console.error('There was an error fetching the menus', error);
    }
  };

  return (
      <div className="min-h-screen p-4 bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Menus</h1>
        {menus.map((menu) => (
            <Card key={menu._id} shadow={false} className="max-w-[400px] m-auto mb-8">
              <CardHeader className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold">{menu.restaurant_name}</h2>
                <p>{menu.restaurant_slogan}</p>
                <Image
                    src={menu.restaurant_logo_url}
                    alt={menu.restaurant_name}
                    width={256}
                    height={256}
                />
              </CardHeader>
              <CardBody className="flex flex-col gap-3 items-center">
                {menu.food_items.map((item) => (
                    <Card key={item.title} className="mb-4 flex flex-col items-center w-full">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p>{item.description}</p>
                      <p>{'$' + (item.price ? item.price : '0')}</p>
                      <Image
                          src={item.picture_url}
                          alt={item.title}
                          width={128}
                          height={128}
                      />
                    </Card>
                ))}
              </CardBody>
              <CardFooter className="flex flex-col items-center">
                <Link href={`/menu/${menu._id}`}>
                  <a className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                    View Menu
                  </a>
                </Link>
                <div className="mt-4">
                  <QRCode
                      value={`http://cs3300-gcp-assignment-401202.uc.r.appspot.com/menu/${menu._id}`}
                      size={150}
                      level="M"
                      includeMargin={true}
                  />
                </div>
              </CardFooter>
            </Card>
        ))}
      </div>
  );
};

export default MenusPage;