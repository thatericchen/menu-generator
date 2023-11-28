import { useState } from "react";
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
  Card,
  CardBody,
  Image,
} from "@nextui-org/react";
import { IoCloudUploadOutline } from "react-icons/io5";

interface FoodItem {
  title: string;
  description: string;
  picture: File | null;
  pictureUrl: string | null;
  price: string;
  dietaryRestrictions: string;
  vegetarian: boolean;
  spicy: boolean;
  glutenFree: boolean;
}


const InputPage = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantLogo, setRestaurantLogo] = useState<File | null>(null);
  const [restaurantLogoUrl, setRestaurantLogoUrl] = useState<string | null>(null);
  const [restaurantSlogan, setRestaurantSlogan] = useState("");
  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    {
      title: "",
      description: "",
      picture: null,
      pictureUrl: null,
      price: "",
      dietaryRestrictions: "",
      vegetarian: false,
      spicy: false,
      glutenFree: false,
    },
  ]);
  const {
    isOpen: isRestaurantLogoModalOpen,
    onOpen: openRestaurantLogoModal,
    onOpenChange: setIsRestaurantLogoModalOpen,
  } = useDisclosure();
  const {
    isOpen: isDishImageModalOpen,
    onOpen: openDishImageModal,
    onOpenChange: setIsDishImageModalOpen,
  } = useDisclosure();

  const handleAddFoodItem = () => {
    setFoodItems([
      ...foodItems,
      {
        title: "",
        description: "",
        picture: null,
        pictureUrl: null,
        price: "",
        dietaryRestrictions: "",
        vegetarian: false,
        spicy: false,
        glutenFree: false,
      },
    ]);
  };

  const handleFoodItemChange = (index: number, field: keyof FoodItem, value: any) => {
    const newFoodItems = [...foodItems];
    if (field === 'picture') {
      if (value.target.files) {
        newFoodItems[index] = { ...newFoodItems[index], [field]: value.target.files[0], pictureUrl: URL.createObjectURL(value.target.files[0]) };
      }
    } else {
      newFoodItems[index] = { ...newFoodItems[index], [field]: value };
    }
    setFoodItems(newFoodItems);
  };  

  const handleRestaurantLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setRestaurantLogo(e.target.files[0]);
      setRestaurantLogoUrl(URL.createObjectURL(e.target.files[0]));
    }
  };  

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('restaurantName', restaurantName);
    formData.append('restaurantSlogan', restaurantSlogan);
    if (restaurantLogo) {
      formData.append('restaurantLogo', restaurantLogo);
    }

    foodItems.forEach((item, index) => {
      formData.append(`foodItems[${index}].title`, item.title);
      formData.append(`foodItems[${index}].description`, item.description);
      formData.append(`foodItems[${index}].price`, item.price);
      formData.append(`foodItems[${index}].dietaryRestrictions`, item.dietaryRestrictions);
      formData.append(`foodItems[${index}].vegetarian`, String(item.vegetarian));
      formData.append(`foodItems[${index}].spicy`, String(item.spicy));
      formData.append(`foodItems[${index}].glutenFree`, String(item.glutenFree));

      if (item.picture) {
        formData.append(`foodItems[${index}].picture`, item.picture);
      }
    });

    try {
      if (localStorage.token) {
      const response = await fetch(import.meta.env["VITE_BACKEND_URI"] + '/submit', {
        method: 'POST',
        headers: {
          'x-access-token': localStorage.token,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData)
        window.location.href = `./menu/${responseData.id}`;
      } else {
        console.error('Form submission failed');
      }
    }
      } catch (error) {
        console.error('There was an error submitting the form', error);
      }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
<Card shadow-sm className="min-w-[400px] mx-auto p-4 items-center mb-5 mt-5">
  <h1 className="text-center text-2xl font-bold">
    Restaurant Information
  </h1>
  {restaurantLogoUrl && <Image src={restaurantLogoUrl} alt="Restaurant Logo" style={{ width: '128px', height: '128px' }} className='mt-5'/>}
  <CardBody>
    <Input
      label="Restaurant Name"
      value={restaurantName}
      radius="sm"
      onChange={(e) => setRestaurantName(e.target.value)}
      className='mb-3'
    />

    <Input
      label="Restaurant Slogan (Optional)"
      value={restaurantSlogan}
      radius="sm"
      onChange={(e) => setRestaurantSlogan(e.target.value)}
      className='mb-3'
    />

    <div className="flex justify-center">
      <Button
        radius="sm"
        onPress={openRestaurantLogoModal}
        style={{ backgroundColor: "#0070f3", color: "white" }}
      >
        <IoCloudUploadOutline size={20} style={{ marginRight: 8 }} />
        Restaurant Logo
      </Button>
    </div>

    <Modal
      isOpen={isRestaurantLogoModalOpen}
      onOpenChange={setIsRestaurantLogoModalOpen}
      style={{ borderRadius: 10 }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader style={{ backgroundColor: "#f0f0f0", color: "#333" }}>
              Upload Restaurant Logo
            </ModalHeader>
            <ModalBody>
              <Input
                type="file"
                onChange={handleRestaurantLogoChange}
                accept="image/*"
                style={{ padding: 10, borderColor: "#0070f3" }}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Upload
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  </CardBody>
</Card>
      <h2 className="text-center text-2xl font-bold mb-5">
        Menu Items
      </h2>
      {foodItems.map((item, index) => (
        <Card shadow-sm className="min-w-[400px] mx-auto p-4 items-center mb-5">
          {item.pictureUrl && <Image src={item.pictureUrl} alt="Item Picture" style={{ width: '128px', height: '128px' }} className='mb-5' />}
        <div key={index}>
        
          <Input
            label="Title"
            value={item.title}
            radius="sm"
            onChange={(e) =>
              handleFoodItemChange(index, "title", e.target.value)
            }
            className='mb-3'
          />
          <Input
            label="Description"
            value={item.description}
            radius="sm"
            onChange={(e) =>
              handleFoodItemChange(index, "description", e.target.value)
            }
            className='mb-3'
          />
          <Input
          type="number"
          label="Price"
          value={item.price}
          radius="sm"
          onChange={(e) =>
            handleFoodItemChange(index, "price", e.target.value)
          }
          className='mb-3'
          placeholder="0.00"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
          />
          <Input
            label="Dietary Restrictions"
            value={item.dietaryRestrictions}
            radius="sm"
            onChange={(e) =>
              handleFoodItemChange(index, "dietaryRestrictions", e.target.value)
            }
            className='mb-3'
          />

          <div style={{ marginTop: 5 }}>
            <Checkbox
              checked={item.vegetarian}
              radius="sm"
              size="sm"
              onChange={(e) =>
                handleFoodItemChange(index, "vegetarian", e.target.checked)
              }
              className='mx-3'
            >
              Vegetarian
            </Checkbox>
            <Checkbox
              checked={item.spicy}
              radius="sm"
              size="sm"
              className='mx-3'
              onChange={(e) =>
                handleFoodItemChange(index, "spicy", e.target.checked)
              }
            >
              Spicy
            </Checkbox>
            <Checkbox
              checked={item.glutenFree}
              radius="sm"
              size="sm"
              className='mb-3 mx-3'
              onChange={(e) =>
                handleFoodItemChange(index, "glutenFree", e.target.checked)
              }
            >
              Gluten-Free
            </Checkbox>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 0",
            }}
          >
            <Button
              radius="sm"
              onPress={openDishImageModal}
              style={{ backgroundColor: "#0070f3", color: "white" }}
            >
              <IoCloudUploadOutline size={20} style={{ marginRight: 8 }} />
              Picture
            </Button>
          </div>

          <Modal
            isOpen={isDishImageModalOpen}
            onOpenChange={setIsDishImageModalOpen}
            style={{ borderRadius: 10 }}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader
                    style={{ backgroundColor: "#f0f0f0", color: "#333" }}
                  >
                    Upload Item Picture
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      type="file"
                      onChange={(e) => handleFoodItemChange(index, "picture", e)}
                      accept="image/*"
                      style={{ padding: 10, borderColor: "#0070f3" }}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Upload
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        </Card>
      ))}
      <Button onClick={handleAddFoodItem}>Add Item</Button>
      <Button
        style={{ marginTop: 20, marginBottom: 30 }}
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Button
        style={{ marginTop: 20, marginBottom: 30 }}
        color="primary"
        onClick={() => window.location.replace("/menus")}
      >
        See All Menus
      </Button>
    </div>
  );
};

export default InputPage;
