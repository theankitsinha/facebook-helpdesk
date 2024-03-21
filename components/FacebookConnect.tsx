'use client';
import React, {useEffect, useState} from 'react';
import FacebookLogin from "@greatsumini/react-facebook-login";
import axios from "axios";
import {AccountPageResponse, PageResponse} from "@/types/facebook";
import Link from "next/link";

export default function FacebookConnect() {
    const [loading, setLoading] = useState(false);
    const [pageStatus, setPageStatus] = useState('default');
    const [pages, setPages] = useState([]);
    const [connectedPages, setConnectedPages] = useState([]);
    const [notConnectedPages, setNotConnectedPages] = useState([]);
    const [action, setAction] = useState("Action");
    const [userAccessToken, setUserAccessToken] = useState(process.env.NEXT_PUBLIC_APITOKEN);
    const [userFacebookId, setUserFacebookId] = useState("")

    const appId = process.env.NEXT_PUBLIC_FACEBOOK_ID ?? '';

    const handleResponse = async (data: any) => {
        try {
            console.log('Facebook login response:', data);
            setUserAccessToken(data.accessToken);
            setUserFacebookId(data.userId);
            setLoading(false);
            setPageStatus('pages');
            // let exists = await fetch("/api/core/check", {
            //     method: 'POST',
            //     body: JSON.stringify(data)
            // });
        } catch (error) {
            alert("Submitting form failed!");
        }
    }
    useEffect(() => {
        setLoading(true);
        setAction("Fetching Pages");
        if (userAccessToken && userAccessToken != '') {
            setPageStatus('pages')
            const fetchPages = async () => {
                try {
                    const response = await axios.get(
                        `https://graph.facebook.com/v19.0/me/accounts?access_token=${userAccessToken}`
                    );
                    setPages(response.data.data);
                    await fetchConnectedPages();
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching pages:', error);
                    setLoading(false);
                }
            };
            fetchPages();
        }
    }, [userAccessToken]);

    useEffect(() => {
        setLoading(true);
        const notConnectedPagesList = pages.filter((page: AccountPageResponse) => !connectedPages.some((connectedPage: any) => connectedPage.pageId === page.id));
        setNotConnectedPages(notConnectedPagesList);
        setLoading(false);
    }, [pages, connectedPages]);

    const fetchConnectedPages = async () => {
        try {
            const response = await fetch('/api/core/page');
            const data = await response.json();
            setConnectedPages(data);
        } catch (error) {
            console.error('Error fetching connected pages:', error);
        }
    };

    useEffect(() => {
        setLoading(true);
        setAction("Fetching Pages");
        fetchConnectedPages();
        setLoading(false);
    }, []);
    const handlePageConnect = async (page: AccountPageResponse) => {
        try {
            const res = await fetch('/api/core/page',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        pageId: page.id,
                        name: page.name,
                        accessToken: page.access_token,
                    })
                }
            );
            const data = await res.json();
            if (data.success == false) {
                alert("Could not connect the page right now. Please try again after some time!");
                return;
            } else {
                alert("Page Connected Successfully!");
            }
            setLoading(false);
            fetchConnectedPages();
        } catch (error) {
            console.log(error);
        }
    }

    const disconnectPage = async (pageId: string) => {
        try {
            const res = await fetch('/api/core/page',
                {
                    method: 'DELETE',
                    body: JSON.stringify({
                        pageId: pageId,
                    })
                }
            );
            await res.json();
            setLoading(false);
            await fetchConnectedPages();
            setConnectedPages((prev) => prev.filter((connectedPage: any) => connectedPage.id !== pageId));
            alert("Page Disconnected Successfully!");
        } catch (error) {
            console.log(error);
            alert("Could not disconnect the page right now. Please try again after some time!");
        }
    }

    return (
        <>
            <div className="dashboard-screen container mt-5">
                {loading && (
                    <div className="loading-overlay">
                        <div className='actionText'> Connecting to your facebook account</div>
                    </div>
                )}

                <div className='fbLoginBox'>
                    <div>
                        Facebook Page Integration
                    </div>
                    {pageStatus === 'default' ?
                        (
                            <FacebookLogin
                                appId={appId}
                                onSuccess={handleResponse}
                                onFail={(error) => {
                                    alert("Could not connect to facebook at the moment! Please Contact the app owner.")
                                    console.log('Login Failed!', error);
                                }}
                                onProfileSuccess={(response) => {
                                    console.log('Get Profile Success!', response);
                                }}
                                initParams={{
                                    version: 'v16.0',
                                    xfbml: true,
                                }}
                                loginOptions={{
                                    return_scopes: true,
                                }}
                            />
                        ) : (
                            <>
                                <div className={`my-component ${loading ? 'loading' : ''}`}>
                                    <div className={`facebook-connection-screen container mt-5 content`}>

                                        {loading && (
                                            <div className="loading-overlay">
                                                <div className='actionText'> {action} </div>
                                            </div>
                                        )}

                                        {notConnectedPages.length > 0 && (
                                            <div className='available-pages-div'>
                                                <div className='head-div'>Available Pages</div>
                                                <div className='available-pages'>
                                                    {notConnectedPages.map((page: AccountPageResponse) => (
                                                        <div className='page-box' key={page.id}>
                                                            <div>Page: <span className='page-name'>{page.name} </span>
                                                            </div>
                                                            <div className='btn navigate-btn' onClick={() => {
                                                                setAction("Connecting Page")
                                                                setLoading(true);
                                                                setTimeout(() => {
                                                                    handlePageConnect(page)
                                                                }, 2000);
                                                            }
                                                            }
                                                            >
                                                                Connect Page

                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}


                                        <div className='connected-pages-div'>

                                            <div className='head-div'>Facebook Page Integration</div>
                                            <div className='connected-pages'>
                                                {connectedPages.length === 0 && <div> No Page Connected </div>}
                                                {connectedPages.map((page: PageResponse) => (
                                                    <div key={page.pageId}>
                                                        <div className='page-box'>
                                                            <div>Integrated Page: <span
                                                                className='page-name'>{page.name} </span></div>
                                                            <div>
                                                                <div className='btn delete-btn'
                                                                     onClick={() => {
                                                                         setAction("Deleting Page")
                                                                         setLoading(true);
                                                                         setTimeout(() => {
                                                                             disconnectPage(page.pageId)
                                                                         }, 2000);
                                                                     }
                                                                     }
                                                                >
                                                                    Delete Integration

                                                                </div>
                                                                <Link className='btn navigate-btn'

                                                                      onClick={() => {
                                                                          setAction("Loading Conversations")
                                                                          setLoading(true);
                                                                      }
                                                                      }
                                                                      href={'/agent/' + page.pageId}>
                                                                    Reply to Messages

                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }

                </div>
            </div>
        </>

    );
};
