import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkPostPin } from "../../redux/pin";
import "./CreatePin.css";

function CreatePin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const newPin = useSelector((state) => state.pins.pins)
  const [errors, setErrors] = useState({});
  const [validation, setValidation] = useState({});
  const [disabled, setDisabled] = useState(false);
  // const [hasSubmitted, setHasSubmitted] = useState(false);

  const [pinLink, setPinLink] = useState();
  const [file, setFile] = useState("No Image");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useSelector((state) => state.session?.user)
  // console.log("CURRENTUSER====>",currentUser)

  function onImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      setPinLink(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
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
      description,
    };
    // console.log("file====>", file)

    const response = await dispatch(thunkPostPin(payload));

    if (response.errors) {
      setErrors({ errors: Object.values(response.errors) });
      setDisabled(false);
      return;
    }
    // console.log("pinID====>", response.id)
    const newPinId = response.id;
    // if (newPinId !== null) {
    await navigate(`/pin/${newPinId}`);
    // }
  }

  function clearForm(e) {
    e.preventDefault();
    setTitle("");
    setDescription("");
    setPinLink("");
    setFile("No Image");
  }

  return (
    <div>
    {currentUser ? (<form onSubmit={onSubmit}  className="createPin-container">
      <div className="createPin-left">
        <div>
          <h1>Create a new Pin</h1>
        </div>
          <div className="create-pin-upload-pinLink">
            <img
              src={pinLink}
              alt="Drop you file here..."
              style={{ width: "300px", height: "400px", color:'#ff00bb' }}
              className="createPin-image"
            />
            {file == "No Image" && (
              <input
                type="file"
                accept="image/*"
                name="pin_link"
                onChange={onImageChange}
                className="createPin-choose-file"
                style={{width:'400px', height:'305px'}}
                />
            )}
            {validation.file && <p>{validation.file}</p>}
          </div>

          <div className="createPin-data">
            {errors.errors &&
              errors.errors.map((error, i) => <div key={i} style={{ margin: "0", fontSize: "12px", color: "#ff00bb" }}>{error}</div>)}
          </div>
      </div>
      <div className="createPin-right">
            <label>
              <h4 className="createPin-text-h4">Title:</h4>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{width:'400px', color:'#000000', backgroundColor:'#d3f71220', borderColor: '#ff00bb20', padding:'10px'}}
              />
              {validation.title && <p style={{
                    marginTop: "10px",
                    fontSize: "12px",
                    color: "#ff00bb",
                  }}>{validation.title}</p>}
            </label>

            <label>
            <h4 className="createPin-text-h4">Description:</h4>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{width:'400px', height: '100px', color:'#000000', backgroundColor:'#d3f71220', borderColor: '#ff00bb20', padding:'10px'}}
              />
              {validation.description && <p style={{
                    marginTop: "10px",
                    fontSize: "12px",
                    color: "#ff00bb",
                  }}>{validation.description}</p>}
            </label>

            <div className="createPin-button-container">
              <button type="cancel" onClick={clearForm} className="createPin-button">
                Cancel
              </button>

              <button type="submit" disabled={disabled} className="createPin-button">
                Submit
              </button>
            </div>
          </div>
    </form>) : <h3 style={{padding: '100px 40px', color:'#ff00bb', fontWeight:'normal', fontSize:'24px'}}>Please Log in or Sign up first...</h3>}
    </div>
  );
}

export default CreatePin;
