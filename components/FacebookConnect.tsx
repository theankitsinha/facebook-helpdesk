'use client';
import React, {useEffect, useState} from 'react';
import FacebookLogin from "@greatsumini/react-facebook-login";
import axios from "axios";
import {AccountPageResponse, PageResponse} from "@/types/facebook";
import Link from "next/link";
import Button from "@/components/ui/button";

export default function FacebookConnect() {
    const [loading, setLoading] = useState(false);
    const [pageStatus, setPageStatus] = useState('default');
    const [pages, setPages] = useState([]);
    const [connectedPages, setConnectedPages] = useState([]);
    const [notConnectedPages, setNotConnectedPages] = useState([]);
    const [action, setAction] = useState("Action");
    const [userAccessToken, setUserAccessToken] = useState("");
    const [userFacebookId, setUserFacebookId] = useState("")

    const appId = process.env.NEXT_PUBLIC_FACEBOOK_ID ?? '';

    const handleResponse = async (data: any) => {
        try {
            setUserAccessToken(data.accessToken);
            setUserFacebookId(data.userId);
            setLoading(false);
            setPageStatus('pages');
        } catch (error) {
            alert("Facebook login failed!");
        }
    }
    const updateProfile = async (data: any) => {
        try {
            await fetch("/api/core/user", {
                method: 'POST',
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.log("Profile update failed: ", error);
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
            if (data.length > 0) {
                setPageStatus('pages');
            }
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
            if (connectedPages.length == 0) {
                setPageStatus('default');
            }
            alert("Page Disconnected Successfully!");
        } catch (error) {
            console.log(error);
            alert("Could not disconnect the page right now. Please try again after some time!");
        }
    }

    return (
        <>
            <div className="container h-screen">
                <div className="flex mx-auto min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
                    <div className="bg-white w-[33%] py-10 rounded-3xl">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-700">Facebook
                                Page Integration</h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            {pageStatus === 'default' ?
                                (
                                    <FacebookLogin
                                        appId={appId}
                                        scope="pages_show_list,pages_messaging,pages_read_engagement,pages_manage_metadata"
                                        onSuccess={handleResponse}
                                        onFail={(error) => {
                                            alert("Could not connect to facebook at the moment! Please Contact the app owner.")
                                            console.log('Login Failed!', error);
                                        }}
                                        onProfileSuccess={updateProfile}
                                        initParams={{
                                            version: 'v16.0',
                                            xfbml: true,
                                        }}
                                        loginOptions={{
                                            return_scopes: true,
                                        }}
                                        render={(renderProps) => (
                                            <Button
                                                onClick={renderProps.onClick}
                                                className="w-full bg-blue-800 p-4 text-white rounded-xl"
                                            >
                                                Connect Page
                                            </Button>
                                        )}
                                    />
                                ) : (
                                    <>
                                        <div
                                            className="flex mx-auto min-h-full flex-col justify-center items-center px-6 py-6">
                                            {notConnectedPages.length > 0 && (
                                                <>
                                                    <h4 className="mt-4 text-center text-xl font-bold leading-9 tracking-tight text-gray-700">Available
                                                        Pages</h4>
                                                    <div className='flex-col'>
                                                        {notConnectedPages.map((page: AccountPageResponse) => (
                                                            <div key={page.id}>
                                                                <div className="font-bold">
                                                                    Page: <span
                                                                    className='font-medium'>{page.name} </span>
                                                                </div>
                                                                <Button
                                                                    onClick={() => {
                                                                        setAction("Connecting Page")
                                                                        setLoading(true);
                                                                        setTimeout(() => {
                                                                            handlePageConnect(page)
                                                                        }, 2000);
                                                                    }
                                                                    }
                                                                >
                                                                    Connect Page

                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                            {connectedPages.map((page: PageResponse) => (
                                                <div key={page.pageId}>
                                                    <div>
                                                        <p className="text-center text-gray-700 leading-9 text-lg font-medium">Integrated
                                                            Page: <span
                                                                className="font-bold">{page.name} </span></p>
                                                    </div>
                                                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                                        <button type="button"
                                                                onClick={() => {
                                                                    setAction("Deleting Page")
                                                                    setLoading(true);
                                                                    setTimeout(() => {
                                                                        disconnectPage(page.pageId)
                                                                    }, 2000);
                                                                }}
                                                                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700">Delete
                                                            Integration
                                                        </button>
                                                        <Link className='btn navigate-btn' onClick={() => {
                                                            setAction("Loading Conversations")
                                                            setLoading(true);
                                                        }
                                                        }
                                                              href={'/agent/' + page.pageId}>

                                                            <Button>Reply To Messages</Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};
