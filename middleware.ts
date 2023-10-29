import type { NextRequest } from "next/server";
import {  NextResponse } from "next/server";

export default function middleware(req: NextRequest) {

    const verified = req.cookies.get("loggedIn");
    const url = req.nextUrl.clone().pathname;

    if (!verified  && url == '/dashboard') {
       
        return NextResponse.redirect(new URL('/signIn', req.nextUrl));
    }
    if(verified &&  url == '/signIn'){
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }
}