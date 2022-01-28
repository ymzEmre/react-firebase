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
        if (err) console.log(err);
        else setCurrentId("");
      });
    else
      firebaseDb.child(`personnel-demo/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
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
          if (err) console.log(err);
          else setCurrentId("");
        });
        alertify.success(PersonnelObjects[key].fullName + " deleted");
      },
      function () {}
    );
  };

  return (
    <div>
      <PersonnelForm {...{ addOrEdit, currentId, PersonnelObjects }} />

      <table id="data" className="personnelTable">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Phone</th>
            <th>E-Mail</th>
            <th>Department</th>
            <th>Salary</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(PersonnelObjects).map((id) => {
            return (
              <tr key={id}>
                <td className="textIndent">{PersonnelObjects[id].fullName}</td>
                <td className="textIndent">{PersonnelObjects[id].phone}</td>
                <td className="textIndent">{PersonnelObjects[id].email}</td>
                <td className="textIndent">{PersonnelObjects[id].department}</td>
                <td className="textIndent">{PersonnelObjects[id].salary}</td>
                <td className="center iconSet">
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PersonnelList;
