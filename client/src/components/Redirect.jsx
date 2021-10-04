import React, { useState, useEffect } from "react";
import { getUrl } from "./../services/urlService";
import { useParams } from "react-router-dom";

const RedirectFullLink = () => {
    const { code } = useParams();

    useEffect(async () => {
        const { data } = await getUrl(code);
        if (data) {
            window.location.replace(data.longUrl);
        }
    });

    return (
        <div class="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default RedirectFullLink;
