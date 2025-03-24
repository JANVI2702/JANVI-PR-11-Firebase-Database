import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import"./App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import { faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

function App() {
  let [users, setUsers] = useState([]);
  let [record, setRecord] = useState({});
  let [index, setIndex] = useState(0);
  let [hobby, setHobby] = useState([]);
  let [city, setCity] = useState(["Surat", "Bharuch", "Vadodara"]);

  const collections = collection(db, "users");

  useEffect(() => {
    getUserData();
  }, [setUsers]);

  const getUserData = async () => {
    let userData = await getDocs(collections);
    let userRecord = [];

    userData.docs.map((doc) => {
      let obj = { ...doc.data(), id: doc.id };
      userRecord.push(obj);
    });
    setUsers(userRecord);
  };

  const getInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    let newArray = [...hobby];
    if (name == "hobby") {
      if (e.target.checked) {
        newArray.push(e.target.value);
      } else {
        let newHobby = newArray.filter((v, i) => v !== e.target.value);
        newArray = newHobby;
      }
    }
    setHobby(newArray);
    console.log(newArray);
    if (name == "hobby") {
      setRecord({ ...record, [name]: newArray });
    } else {
      setRecord({ ...record, [name]: value });
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    if (index != 0) {
      let getUserRecord = doc(db, "users", index);
      await updateDoc(getUserRecord, record);
      toast.success("Data Edited");
    } else {
      await addDoc(collections, record);
      toast.success("Data Added");
    }
    getUserData();
    setRecord({});
    setHobby([]);
    setIndex(0);
  };

  let deleteData = async (id) => {
    let userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getUserData();
    toast.success("Data Deleted");
  };

  let updateData = async (id) => {
    setIndex(id);
    let getUser = doc(db, "users", id);
    let singleData = await getDoc(getUser);
    setRecord(singleData.data());
    setHobby(singleData.data().hobby ? singleData.data().hobby : []);
  };

  return (
    <>
      <div  >
        <h1 className="text-center mb-3">Firebase Data</h1>
        <form
          action="post"
          onSubmit={(e) => submitData(e)}
          className="container p-4 border rounded shadow-lg bg-light"
        >
         
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              onChange={(e) => getInput(e)}
              value={record.name ? record.name : ""}
            />
          </div>

        
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              onChange={(e) => getInput(e)}
              value={record.email ? record.email : ""}
            />
          </div>

        
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              onChange={(e) => getInput(e)}
              value={record.password ? record.password : ""}
            />
          </div>

         
          <div className="mb-3">
            <label className="form-label d-block">Gender</label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="gender"
                value="male"
                className="form-check-input"
                onChange={(e) => getInput(e)}
                checked={record.gender === "male"}
              />
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="gender"
                value="female"
                className="form-check-input"
                onChange={(e) => getInput(e)}
                checked={record.gender === "female"}
              />
              <label className="form-check-label">Female</label>
            </div>
          </div>

          
          <div className="mb-3">
            <label className="form-label d-block">Hobbies</label>
            {["Reading", "Dancing", "Coding"].map((hobbyName) => (
              <div key={hobbyName} className="form-check form-check-inline">
                <input
                  type="checkbox"
                  name="hobby"
                  value={hobbyName}
                  className="form-check-input"
                  onChange={(e) => getInput(e)}
                  checked={hobby.includes(hobbyName)}
                />
                <label className="form-check-label">{hobbyName}</label>
              </div>
            ))}
          </div>

          <div className="mb-3">
            <label className="form-label">City</label>
            <select
              name="city"
              className="form-select"
              onChange={(e) => getInput(e)}
            >
              <option value="">-- Select City --</option>
              {city.map((v, i) => (
                <option key={i} value={v} selected={record.city === v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

         
          <div className="mb-3">
            <label className="form-label">Upload Image URL</label>
            <input
              type="text"
              name="image"
              className="form-control"
              onChange={(e) => getInput(e)}
            />
          </div>

          
          <button type="submit" className="btn btn-primary w-100">
            {index ? "Edit" : "Submit"}
          </button>
        </form>

        <div className="table-responsive container mt-3">
          <table className="table table-striped table-bordered table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>Sr No.</th>
                <th>Name</th>
                <th>Email</th>
                
                <th>Gender</th>
                <th>Hobby</th>
                <th>City</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((v, i) => (
                <tr key={v.id}>
                  <td>{i + 1}</td>
                  <td>{v.name}</td>
                  <td>{v.email}</td>
                
                  <td>{v.gender}</td>
                  <td>{v.hobby ? v.hobby.toString() : ""}</td>
                  <td>{v.city}</td>
                  <td>
                    <img
                      src={v.image}
                      alt="User"
                      className="img-thumbnail"
                      style={{ height: "60px", width: "60px" }}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => deleteData(v.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => updateData(v.id)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;