import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkPostPin } from "../../redux/pin";

function CreatePin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const newPin = useSelector((state) => state.pins.pins)
  const [errors, setErrors] = useState({});
  const [validation, setValidation] = useState({});
  const [disabled, setDisabled] = useState(false);
  // const [hasSubmitted, setHasSubmitted] = useState(false);

  const [pinLink, setPinLink] = useState();
  const [file, setFile] = useState("No Image")
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function onImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      setPinLink(URL.createObjectURL(e.target.files[0]))
      setFile(e.target.files[0])
    }
  }

  function validate() {
    const tempValidation = {};
    if ("" == title) tempValidation.title = "Enter a title.";
    if ("" == description) tempValidation.description = "Enter a description.";
    if ("" == file) tempValidation.file = "Enter a pin link.";
    setValidation(tempValidation);

    if (Object.values(tempValidation)?.length != 0) return false;
    return true;
  }

  // if(!newPin) return null
  // console.log("newPin===>", newPin)
  // const keys = Object.keys(newPin)
  // const newPinId = keys.length > 0 ? keys.pop() : null;
  // console.log(newPinId)


  async function onSubmit(e) {
    e.preventDefault();
    setDisabled(false);

    if (!validate()) {
      setDisabled(false);
      return;
    }

    const payload = {
      title,
      pin_link: file,
      description
    };
    // console.log("file====>", file)

    const response = await dispatch(thunkPostPin(payload));

    if (response.errors) {
      setErrors({ errors: Object.values(response.errors) });
      setDisabled(false);
      return;
    }
    // console.log("pinID====>", response.id)
    const newPinId = response.id
    // if (newPinId !== null) {
    await navigate(`/pin/${newPinId}`);
    // }
  }

  function clearForm(e) {
    e.preventDefault();
    setTitle("");
    setDescription("");
    setPinLink("")
    setFile("No Image");
  }


  return (
    <form onSubmit={onSubmit} className="create-pin-container">
      <div>
        <h1>Create a new Pin</h1>
      </div>
      <div>
        <div className="create-pin-upload-pinLink">
          <img src={pinLink} alt="Pin Image Here" style={{ width: "300px", height: "400px" }} />
          {file == "No Image" && (
            <input type="file" accept="image/*" name="pin_link" onChange={onImageChange} />
          )}
          {validation.file && <p>{validation.file}</p>}
        </div>
        <div className="create-pin-data">
          {errors.errors &&
            errors.errors.map((error, i) => <div key={i}>{error}</div>)}

          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {validation.title && <p>{validation.title}</p>}
          </label>

          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {validation.description && <p>{validation.description}</p>}
          </label>

          <div className="create-pin-button-container">
            <button type="cancel" onClick={clearForm}>
              Cancel
            </button>

            <button type="submit" disabled={disabled}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreatePin;
