import React, { useState, useEffect } from 'react';
import {
    Button,
    Input,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Checkbox,
    Link,
  } from "@nextui-org/react";

interface Menu {
  _id: string;
  restaurant_name: string;
  restaurant_slogan: string;
  restaurant_logo_url: string;
  restaurant_logo_path: string;
  owner: string;
  food_items: FoodItem[];
}

interface FoodItem {
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
      const response = await fetch(import.meta.env["BACKEND_URI"] + '/menus', {
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
    <div className="p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Menus</h1>
      {menus.map((menu) => (
        <div key={menu._id} className="p-4 bg-white rounded shadow mb-4">
          <h2 className="text-2xl font-bold mb-2">{menu.restaurant_name}</h2>
          <p className="mb-2">{menu.restaurant_slogan}</p>
          <img
            src={menu.restaurant_logo_url}
            alt={menu.restaurant_name}
            className="w-64 h-64 object-cover mb-4"
          />
          {menu.food_items.map((item) => (
            <div key={item.title} className="mb-4">
              <h3 className="text-xl font-bold mb-1">{item.title}</h3>
              <p className="mb-1">{item.description}</p>
              <p className="mb-1">{item.price}</p>
              <p className="mb-1">{item.dietary_restrictions}</p>
              <p className="mb-1">{item.vegetarian ? 'Vegetarian' : ''}</p>
              <p className="mb-1">{item.spicy ? 'Spicy' : ''}</p>
              <p className="mb-1">{item.gluten_free ? 'Gluten-Free' : ''}</p>
              <img
                src={item.picture_url}
                alt={item.title}
                className="w-32 h-32 object-cover"
              />
            </div>
          ))}
          <Link href={`/menu/${menu._id}`}>
            <a className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded">View Menu</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MenusPage;