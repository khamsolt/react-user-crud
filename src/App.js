import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import { EyeIcon, PencilSquareIcon, TrashIcon } from "./icons";
import api from "./services/api";

function App() {
  const onCreateRequestHandler = (updatedData) => {
    api.users
      .create(updatedData)
      .then(({ data }) => {
        setSelectedUser(data);
        onFetchRequestHandler();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onUpdateRequestHandler = (updatedData, { id }) => {
    api.users
      .update(id, updatedData)
      .then(({ data }) => {
        setSelectedUser(data);
        onFetchRequestHandler();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onFetchRequestHandler = async () => {
    try {
      const { data } = await api.users.fetch(20, 0);
      setData(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const onViewHandler = (user) => {
    setIsCreating(false);
    setSelectedUser(user);
  };
  const onUpdateHandler = (user) => {
    setIsCreating(false);
    setSelectedUser(user);
  };
  const onDeleteHandler = (user) => {
    api.users
      .delete(user.id)
      .then(({ data }) => {
        alert(data.success);
        setSelectedUser(null);
        onFetchRequestHandler();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const onCreateHandler = () => {
    setIsCreating(true);
    setSelectedUser(null);
  };

  const [data, setData] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    onFetchRequestHandler();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row mt-5">
        <div className="col d-flex">
          <button className="btn btn-outline-primary mr-3">Update</button>
          <button
            className="btn btn-outline-success mr-3"
            onClick={onCreateHandler}
          >
            Create
          </button>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-3">
          <div className="card border-primary">
            <div className="card-body">
              <Form
                user={selectedUser}
                isCreating={isCreating}
                onClickHandler={
                  isCreating ? onCreateRequestHandler : onUpdateRequestHandler
                }
              />
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="card border-secondary">
            <div className="card-body p-0 table-response">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Thumbnail</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Birthday</th>
                    <th scope="col">Verified</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{item.id}</th>
                        <td>
                          <img
                            width={37}
                            height={37}
                            src={item.thumbnail}
                            alt={item.firstname}
                            className="rounded-circle"
                          />
                        </td>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.email}</td>
                        <td>{item.gender}</td>
                        <td>{item.birthday}</td>
                        <td>{item.verified}</td>
                        <td>
                          <div
                            className="btn-group btn-sm"
                            role="group"
                            aria-label="Basic example"
                          >
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => onViewHandler(item)}
                            >
                              <EyeIcon />
                            </button>
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => onUpdateHandler(item)}
                            >
                              <PencilSquareIcon />
                            </button>
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => onDeleteHandler(item)}
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
