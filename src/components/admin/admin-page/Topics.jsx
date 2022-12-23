import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import AuthUser from "../../../config/AuthUser";
import { baseURL } from "../../../config/getConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [addTopics, setAddTopics] = useState(false);
  const [editTopics, setEdditTopics] = useState(false);
  const { token } = AuthUser();
  const [textTopic, setTextTopic] = useState();

  const handleAddNewTopic = async () => {
    try {
      await axios.post(
        `${baseURL}/api/topics`,
        {
          name: textTopic,
          image_url: "No image",
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Update successful!");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${baseURL}/api/topics`);
        setTopics(res.data.topics);
      } catch (error) {}
    })();
  }, []);
  return (
    <>
      {topics.length <= 0 ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinner">
            <div className="left-[320px] transition-all fixed inset-0 mt-[200px]">
              <div className="spinner">
                <div
                  className="double-bounce1"
                  style={{ backgroundColor: "#eee" }}
                ></div>
                <div
                  className="double-bounce2"
                  style={{ backgroundColor: "#eee" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-[800px] mx-auto left-[320px] transition-all flex  flex-col mt-[50px]">
          <span className="font-bold mb-5 text-[20px]">TOPICS</span>
          <div className="bg-[#0d1520] w-full p-5 rounded-xl">
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th className="font-[500] py-3">Id</th>
                  <th className="font-[500] py-3">Name</th>
                  <th className="font-[500] py-3">Edit</th>
                  <th className="font-[500] py-3">Delete</th>
                </tr>
              </thead>
              {topics.length > 0 &&
                topics.map((item) => (
                  <tbody key={item.id}>
                    <tr>
                      <th className="font-[400] py-3">{item.id}</th>
                      <th className="font-[400] py-3">{item.name}</th>
                      <th className="font-[400] py-3">
                        <div className="w-full flex items-center justify-center">
                          <EditIcon></EditIcon>
                        </div>
                      </th>
                      <th className="font-[400] py-3">
                        <div className="w-full flex items-center justify-center">
                          <DeleteIcon></DeleteIcon>
                        </div>
                      </th>
                    </tr>
                  </tbody>
                ))}
              {addTopics === true && (
                <tbody>
                  <tr>
                    <th className="font-[400] py-3">
                      {topics?.length + 1 || ""}
                    </th>
                    <th className="font-[400] py-3">
                      <input
                        type="text"
                        placeholder=""
                        onChange={(e) => setTextTopic(e.target.value)}
                        className="px-5 py-3 border border-slate-600 border-solid rounded-[4px] outline-none bg-transparent text-center"
                      />
                    </th>
                  </tr>
                </tbody>
              )}
            </table>
            {addTopics === true ? (
              <div className="flex gap-x-6 w-[300px] ml-auto">
                <button
                  onClick={() => setAddTopics(false)}
                  className="top-[10%] right-0 mt-5 w-full inline-flex items-center justify-center px-8 py-4 font-sans font-semibold text-white bg-[#ed3e50] rounded-lg h-[53px]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleAddNewTopic();
                    setAddTopics(false);
                  }}
                  className="top-[10%] right-0 mt-5 w-full inline-flex items-center justify-center px-8 py-4 font-sans font-semibold text-white bg-[#4df6a1] rounded-lg h-[53px]"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="w-full ml-auto max-w-[200px]">
                <button
                  onClick={() => setAddTopics(true)}
                  className="top-[10%] right-0 mt-5 w-full inline-flex items-center justify-center px-8 py-4 font-sans font-semibold text-white bg-[#4df6a1] rounded-lg h-[53px]"
                >
                  + Add New Item
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer autoClose={800} />
    </>
  );
};

export default Topics;
