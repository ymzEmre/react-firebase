import React, { useState, useEffect } from "react";
import PersonnelForm from "../personnelForm/PersonnelForm";
import firebaseDb from "../../firebase";
import alertify from "alertifyjs";
import "./personnelList.css";
import "../../css/alert.css";

const PersonnelList = () => {
  var [PersonnelObjects, setPersonnelObjects] = useState({});
  var [currentId, setCurrentId] = useState("");

  useEffect(() => {
    firebaseDb.child("personnel-demo").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setPersonnelObjects({
          ...snapshot.val(),
        });
      } else {
        setPersonnelObjects({});
      }
    });
  }, []);

  const addOrEdit = (obj) => {
    if (currentId == "")
      firebaseDb.child("personnel-demo").push(obj, (err) => {
        if (err) return;
        else setCurrentId("");
      });
    else
      firebaseDb.child(`personnel-demo/${currentId}`).set(obj, (err) => {
        if (err) return;
        else setCurrentId("");
      });
  };

  const onDelete = (key) => {
    alertify
      .confirm("confirm")
      .set({
        transition: "zoom",
        message: "Transition effect: zoom",
        movable: false,
      })
      .show();

    alertify.confirm(
      "User Delete",
      PersonnelObjects[key].fullName + " will be deleted",
      function () {
        firebaseDb.child(`personnel-demo/${key}`).remove((err) => {
          if (err) return console.log(err);
          else setCurrentId("");
        });
        alertify.success(PersonnelObjects[key].fullName + " deleted");
      },

      function () {
        alertify.error("Delete Cancel");
      }
    );
  };

  return (
    <div>
      <PersonnelForm {...{ addOrEdit, currentId, PersonnelObjects }} />

      <div className="user-list-title">
        <span>Full Name</span>
        <span>Phone</span>
        <span>E-Mail</span>
        <span>Department</span>
        <span>Salary</span>
        <span></span>
      </div>

      {Object.keys(PersonnelObjects).map((id) => {
        return (
          <div className="user-list-content" key={id}>
            <span>{PersonnelObjects[id].fullName}</span>
            <span>{PersonnelObjects[id].phone}</span>
            <span>{PersonnelObjects[id].email}</span>
            <span>{PersonnelObjects[id].department}</span>
            <span>{PersonnelObjects[id].salary}</span>
            <span>
              <i
                onClick={() => {
                  setCurrentId(id);
                }}
                className="fas fa-user-edit"
                style={{ cursor: "pointer" }}
              ></i>

              <i
                onClick={() => {
                  onDelete(id);
                }}
                className="fas fa-user-times"
                style={{ cursor: "pointer" }}
              ></i>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default PersonnelList;
