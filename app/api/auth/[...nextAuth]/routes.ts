import NextAuth from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter';
import InstagramProvider from 'next-auth/providers/instagram';
import SpotifyProvider from "next-auth/providers/spotify";
import {NextApiRequest, NextApiResponse} from "next";
import AppleProvider from "next-auth/providers/apple";

const options = NextAuth({
    providers: [
        InstagramProvider({
            clientId: process.env.INSTAGRAM_CLIENT_ID,
            clientSecret: process.env.INSTAGRAM_CLIENT_SECRET
        }),
        SpotifyProvider({
            clientId: process.env.SPOTIFY_API_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_API_CLIENT_SECRET as string
        }),
        AppleProvider({
            clientId: process.env.APPLE_ID as string,
            clientSecret: process.env.APPLE_SECRET as string
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID as string,
            clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
            version: "2.0"
        })
    ],
})


export {options as GET, options as POST}