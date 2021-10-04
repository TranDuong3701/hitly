import React, { useState } from "react";
import { createUrl } from "./services/urlService";
import Redirect from "./components/Redirect";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

function App() {
    const [url, setUrl] = useState("");
    const [longUrl, setLongUrl] = useState("");
    const notify = () => toast.success("Copied!");

    const handleSubmitUrl = async (e) => {
        e.preventDefault();
        const { data: shortUrl } = await createUrl({ longUrl });
        setUrl(shortUrl);
        setLongUrl("");
    };

    return (
        <Router>
            <Switch>
                <Route path="/:code" render={() => <Redirect />} />
                <Route
                    path="/"
                    exact
                    render={() => (
                        <div className="app">
                            <div className="app__body color-change-2x ">
                                <h1 className="tracking-in-contract-bck  app__title">
                                    HITLY
                                </h1>

                                <div className="app__shorten">
                                    <form class="input-group mb-3">
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Short your link..."
                                            aria-label="Short your link..."
                                            aria-describedby="button-addon2"
                                            value={longUrl}
                                            onChange={(e) =>
                                                setLongUrl(e.target.value)
                                            }
                                        />
                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                            id="button-addon2"
                                            onClick={handleSubmitUrl}
                                        >
                                            Shorten
                                        </button>
                                    </form>

                                    <div className=" input-group">
                                        {url && (
                                            <>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    value={url.shortUrl}
                                                />
                                                <CopyToClipboard
                                                    text={url.shortUrl}
                                                >
                                                    <div>
                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={notify}
                                                        >
                                                            Copy
                                                        </button>
                                                        <ToastContainer />
                                                    </div>
                                                </CopyToClipboard>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                />
            </Switch>
        </Router>
    );
}

export default App;
