import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import { Menu } from './MenusPage';
import { useNavigate } from 'react-router-dom';


const MenuPage = () => {
  const [menu, setMenu] = useState<Menu | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchMenu(id);
    }
  }, [id]);

  const backtomenu = () => {
    navigate('/menus');
  };



  const fetchMenu = async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env["VITE_BACKEND_URI"]}/menu/${id}`, {
        method: 'GET',
        headers: {
          'x-access-token': localStorage.token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMenu(data);
      } else {
        console.error('Failed to fetch menu');
      }
    } catch (error) {
      console.error('There was an error fetching the menu', error);
    }
  };

  if (!menu) {
    return <div>Loading...</div>;
  }

  return (
      <div className="min-h-screen p-5" style={{ backgroundColor: 'black' }}> {/* Background set to yellow */}
        <button onClick={backtomenu} className="mb-4 px-4 py-2 bg-gray-300 text-black rounded">
            Back to Menus
        </button>
        <Card className="max-w-[400px] mx-auto pb-9" style={{ backgroundColor: 'wheat' }}> {/* Card background set to yellow */}
          <CardHeader className="flex flex-col gap-3 items-start">
            <h1 className="text-4xl font-bold mb-4" style={{ color: 'black', fontFamily: 'Apple Chancery, cursive' }}>{menu.restaurant_name}</h1> {/* Text color set to black */}
            <p className="mb-2" style={{ color: 'black' , fontFamily: 'Apple Chancery, cursive' }}>{menu.restaurant_slogan}</p> {/* Text color set to black */}
            {menu.restaurant_logo_url && (
                <Image
                    src={menu.restaurant_logo_url}
                    alt={menu.restaurant_name}
                    width={256}
                    height={256}
                    className="mb-4"
                />
            )}
          </CardHeader>
          <CardBody className="flex flex-col gap-3 items-center mb-2">
            {menu.food_items.map((item) => (
                <Card key={item.title} className="mb-4 flex flex-col items-center min-w-[256px] pb-4" style={{ backgroundColor: 'wheat' }}> {/* Card item background set to yellow */}
                  <h3 className="text-xl font-bold mb-1" style={{ color: 'black', fontFamily: 'Apple Chancery, cursive' }}>{item.title}</h3> {/* Text color set to black */}
                  <p className="mb-1" style={{ color: 'black', fontFamily: 'Apple Chancery, cursive' }}>{item.description}</p> {/* Text color set to black */}
                  <p className="font-bold" style={{ color: 'black', fontFamily: 'Apple Chancery, cursive' }}>{'$' + (item.price ? item.price : 0)}</p> {/* Text color set to black */}
                  <p className="mb-1" style={{ color: 'black', fontFamily: 'Apple Chancery, cursive' }}>{item.dietary_restrictions}</p> {/* Text color set to black */}
                  <p className="mb-1" style={{ color: 'black', fontFamily: 'Apple Chancery, cursive' }}>{item.vegetarian ? 'Vegetarian' : ''}</p> {/* Text color set to black */}
                  <p className="mb-1" style={{ color: 'black', fontFamily: 'Apple Chancery, cursive' }}>{item.spicy ? 'Spicy' : ''}</p> {/* Text color set to black */}
                  <p className="mb-1" style={{ color: 'black', fontFamily: 'Apple Chancery, cursive' }}>{item.gluten_free ? 'Gluten-Free' : ''}</p> {/* Text color set to black */}
                  {item.picture_url && (
                      <Image
                          src={item.picture_url}
                          alt={item.title}
                          width={128}
                          height={128}
                      />
                  )}
                </Card>
            ))}
          </CardBody>
        </Card>
      </div>
  );
};

export default MenuPage;
