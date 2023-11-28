import requests

# Test registration
def test_registration():
    url = "http://localhost:5002/register"
    data = {
        "firstName": "Test",
        "lastName": "User",
        "email": "testuser@gmail.com",
        "password": "testpassword"
    }
    response = requests.post(url, data=data)
    print(f"Registration Response: {response.json()}")

# Test login
def test_login():
    url = "http://localhost:5002/login"
    data = {
        "email": "testuser@gmail.com",
        "password": "testpassword"
    }
    response = requests.post(url, data=data)
    print(f"Login Response: {response.json()}")

# Run the tests
if __name__ == "__main__":
    test_registration()
    test_login()