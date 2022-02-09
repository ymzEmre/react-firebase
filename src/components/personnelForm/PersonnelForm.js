import React, { useState, useEffect } from "react";
import "./personnelForm.css";
import alertify from "alertifyjs";

const PersonnelForm = (props) => {
  const fieldValues = {
    fullName: "",
    phone: "",
    email: "",
    department: "",
    salary: "",
  };

  var [values, setValues] = useState(fieldValues);

  useEffect(() => {
    if (props.currentId == "") setValues({ ...fieldValues });
    else
      setValues({
        ...props.PersonnelObjects[props.currentId],
      });
  }, [props.currentId, props.PersonnelObjects]);

  const handleInputChange = (e) => {
    var { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const formClear = () => {
    setValues({ ...fieldValues });
  };

  alertify.set("notifier", "position", "top-right");
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formValidation = values.fullName.trim() == "" || values.phone.trim() == "" || values.email.trim() == "" || values.department.trim() == "" || values.salary.trim() == "";

    const formValidationphoneNan = isNaN(values.phone);
    const formValidationsalaryNan = isNaN(values.salary);

    if (formValidation) {
      alertify.error("Please fill in all fields !");
    } else if (formValidationphoneNan) {
      alertify.error("Please enter a number in the Phone Field !");
    } else if (formValidationsalaryNan) {
      alertify.error("Please enter a number in the Salary Field !");
    } else {
      props.addOrEdit(values);
      const addOrEditAlert = props.currentId == "" ? alertify.success(values.fullName + " User Added") : alertify.success(props.PersonnelObjects[props.currentId].fullName + " User Edited");
    }
  };

  return (
    <div>
      <div className="container-form-name">
        <span className="form-name"> User Add </span>
      </div>
      <div className="container">
        <form className="form" onSubmit={handleFormSubmit} autoComplete="off">
          <div className="field-container">
            <div className="field-group">
              <label htmlFor="fullName" className="label">
                Full Name
              </label>
              <div className="field">
                <input className="form-input" id="phone" name="fullName" value={values.fullName} onChange={handleInputChange} />
              </div>
            </div>

            <div className="field-group">
              <label className="label"> Phone </label>
              <div className="field">
                <input className="form-input" name="phone" value={values.phone} onChange={handleInputChange} />
              </div>
            </div>

            <div className="field-group">
              <label className="label">E-Mail</label>
              <div className="field">
                <input className="form-input" name="email" value={values.email} onChange={handleInputChange} />
              </div>
            </div>

            <div className="field-group">
              <label className="label">Department</label>
              <div className="field">
                <input className="form-input" name="department" value={values.department} onChange={handleInputChange} />
              </div>
            </div>

            <div className="field-group">
              <label className="label">Salary</label>
              <div className="field">
                <input className="form-input" name="salary" value={values.salary} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          <div className="container-form-button">
            <div className="field-group">
              <div className="field">
                <button
                  onClick={() => {
                    formClear();
                  }}
                  type="reset"
                  className="clearButton form-button"
                >
                  <i className="fas fa-times fa-icon"></i> Clear
                </button>
              </div>
            </div>

            <div className="field-group">
              <div className="field">
                <button className="addButton form-button" type="submit">
                  <i className="fas fa-check fa-icon"></i>
                  {props.currentId == "" ? "  Save" : "  Update"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonnelForm;
