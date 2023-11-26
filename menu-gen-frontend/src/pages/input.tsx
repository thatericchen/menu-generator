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
} from "@nextui-org/react";
import { IoCloudUploadOutline } from "react-icons/io5";

interface FoodItem {
  title: string;
  description: string;
  picture: File | null;
  price: string;
  dietaryRestrictions: string;
  vegetarian: boolean;
  spicy: boolean;
  glutenFree: boolean;
}


const InputPage = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantLogo, setRestaurantLogo] = useState<File | null>(null);
  const [itemPicture, setItemPicture] = useState<File | null>(null);
  const [restaurantSlogan, setRestaurantSlogan] = useState("");
  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    {
      title: "",
      description: "",
      picture: null,
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
        price: "",
        dietaryRestrictions: "",
        vegetarian: false,
        spicy: false,
        glutenFree: false,
      },
    ]);
  };

  const handleFoodItemChange = (
    index: number,
    field: keyof FoodItem,
    value: any
  ) => {
    const newFoodItems = [...foodItems];
    newFoodItems[index] = { ...newFoodItems[index], [field]: value };
    setFoodItems(newFoodItems);
  };

  const handleRestaurantLogoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setRestaurantLogo(e.target.files[0]);
    }
  };

  const handleDishImageModalChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setItemPicture(e.target.files[0]);
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
      const response = await fetch('http://localhost:5002/submit', {
        method: 'POST',
        headers: {
          'x-access-token': localStorage.token,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.error('Form submission failed');
      }
    }
      } catch (error) {
        console.error('There was an error submitting the form', error);
      }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          margin: "20px 0",
          fontSize: "1.5rem",
          color: "#0070f3",
          fontWeight: "bold",
          textShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
          marginBottom: "0.5rem",
          fontFamily: '"Montserrat", sans-serif',
        }}
      >
        Restaurant Information
      </h1>

      <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
        <Input
          label="Restaurant Name"
          value={restaurantName}
          radius="sm"
          onChange={(e) => setRestaurantName(e.target.value)}
        />

        <Input
          label="Restaurant Slogan (Optional)"
          value={restaurantSlogan}
          radius="sm"
          onChange={(e) => setRestaurantSlogan(e.target.value)}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "10px 0",
          }}
        >
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
                <ModalHeader
                  style={{ backgroundColor: "#f0f0f0", color: "#333" }}
                >
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
      </div>

      <h2
        style={{
          textAlign: "center",
          margin: "20px 0",
          fontSize: "1.5rem",
          color: "#0070f3",
          fontWeight: "bold",
          textShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
          marginBottom: "0.5rem",
          fontFamily: '"Montserrat", sans-serif',
        }}
      >
        Menu Items
      </h2>
      {foodItems.map((item, index) => (
        <div key={index} style={{ marginBottom: "25px" }}>
          <Input
            label="Title"
            value={item.title}
            radius="sm"
            onChange={(e) =>
              handleFoodItemChange(index, "title", e.target.value)
            }
          />
          <Input
            label="Description"
            value={item.description}
            radius="sm"
            onChange={(e) =>
              handleFoodItemChange(index, "description", e.target.value)
            }
          />
          <Input
            label="Price"
            value={item.price}
            radius="sm"
            onChange={(e) =>
              handleFoodItemChange(index, "price", e.target.value)
            }
          />

          <Input
            label="Dietary Restrictions"
            value={item.dietaryRestrictions}
            radius="sm"
            onChange={(e) =>
              handleFoodItemChange(index, "dietaryRestrictions", e.target.value)
            }
          />

          <div style={{ marginTop: 5 }}>
            <Checkbox
              checked={item.vegetarian}
              radius="sm"
              size="sm"
              onChange={(e) =>
                handleFoodItemChange(index, "vegetarian", e.target.checked)
              }
              style={{ marginRight: "8px", marginLeft: 1 }}
            >
              Vegetarian
            </Checkbox>
            <Checkbox
              checked={item.spicy}
              radius="sm"
              size="sm"
              onChange={(e) =>
                handleFoodItemChange(index, "spicy", e.target.checked)
              }
              style={{ marginRight: "8px", marginLeft: 1 }}
            >
              Spicy
            </Checkbox>
            <Checkbox
              checked={item.glutenFree}
              radius="sm"
              size="sm"
              onChange={(e) =>
                handleFoodItemChange(index, "glutenFree", e.target.checked)
              }
              style={{ marginRight: "8px", marginLeft: 1 }}
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
                      onChange={handleDishImageModalChange}
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
      ))}
      <Button onClick={handleAddFoodItem}>Add Item</Button>
      <Button
        style={{ marginTop: 20, marginBottom: 30 }}
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default InputPage;
