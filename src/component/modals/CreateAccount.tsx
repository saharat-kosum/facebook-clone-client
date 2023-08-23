import React, { useEffect, useState } from "react";
import { parseISO, format } from "date-fns";
import axios from "axios";
import FileDropzone from "../DropZone";

const defaultUserData = {
  dateOfBirth: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

function CreateAccount() {
  const prefixURL = process.env.REACT_APP_PREFIX_URL;
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [userData, setUserData] = useState(defaultUserData);

  useEffect(() => {
    if (dateOfBirth) {
      const parsedDate = parseISO(dateOfBirth);
      const formattedDate = format(parsedDate, "dd MMM yyyy");
      setUserData((prev) => ({
        ...prev,
        dateOfBirth: formattedDate,
      }));
    }
  }, [dateOfBirth]);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageDataUrl(e.target?.result as string);
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileAdded = (files: File[]) => {
    // Update the uploadedFiles state with the dropped files
    setImageFile(files[0]);
  };

  const signUpHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      // Your form is valid, perform further actions
      const formData = new FormData();
      if (imageFile) {
        formData.append("image", imageFile);
      }
      formData.append("userData", JSON.stringify(userData));
      try {
        // const response = await axios.post(`${prefixURL}/auth/register`)
        // if(response.status == 200){
        //   handleReset()
        // }
        console.log(formData);
      } catch (err) {
        console.error(err);
      }
    } else {
      form.classList.add("was-validated");
    }
  };

  const handleReset = () => {
    setImageFile(null);
    setImageDataUrl("");
    setUserData(defaultUserData);
    setDateOfBirth("");
    const form = document.querySelector(".needs-validation");
    if (form) {
      form.classList.remove("was-validated");
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="createAccountModal"
        tabIndex={-1}
        aria-labelledby="createAccountModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <form
            className="needs-validation"
            noValidate
            onSubmit={(e) => signUpHandle(e)}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="createAccountModalLabel">
                  Sign Up
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    handleReset();
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <div className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputFisrtName1"
                      placeholder="First Name"
                      name="firstName"
                      value={userData.firstName}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <div className="invalid-feedback">
                      Firstname is required.
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputSurname1"
                      placeholder="Surname"
                      name="lastName"
                      value={userData.lastName}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <div className="invalid-feedback">
                      Lastname is required.
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control mt-3"
                    id="exampleInputemail1"
                    placeholder="E-mail"
                    name="email"
                    value={userData.email}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <div className="invalid-feedback">E-mail is required.</div>
                  <input
                    type="password"
                    className="form-control mt-3"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    name="password"
                    value={userData.password}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <div className="invalid-feedback">Password is required.</div>
                  <label htmlFor="exampleInputBirthday1" className="mt-3">
                    Date of birth
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="exampleInputBirthday1"
                    placeholder="Birthday"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">
                    Date of birth is required.
                  </div>
                  {imageFile ? (
                    <div className="position-relative">
                      <i
                        className="bi bi-x-lg hover-cursor position-absolute rounded-circle p-2"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.5)",
                          top: 25,
                          right: 10,
                        }}
                        onClick={() => {
                          setImageFile(null);
                          setImageDataUrl("");
                        }}
                      ></i>
                      <img
                        src={imageDataUrl}
                        alt="upload"
                        className="w-100 mt-3 rounded"
                      />
                    </div>
                  ) : (
                    <div className="upload">
                      <FileDropzone onFileAdded={handleFileAdded} />
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer justify-content-center">
                <button
                  type="submit"
                  className="btn btn-success"
                  // data-bs-dismiss="modal"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
