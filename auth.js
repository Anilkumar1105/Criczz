// auth.js

import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

import {
    auth,
    db
} from "./firebase-config.js";


// LOGIN
export async function loginUser(email, password) {

    try {

        const result = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = result.user;

        const userRef = doc(db, "users", user.uid);

        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {

            await signOut(auth);

            throw new Error(
                "User profile not found in Firestore."
            );
        }

        const userData = userSnap.data();

        if (userData.role === "admin") {
            window.location.href = "admin.html";
        } else {
            await signOut(auth);
            window.location.href = "index.html";
            throw new Error("This login is for administrators only.");
        }

    } catch (error) {

        console.error(error);

        throw error;
    }
}


// LOGOUT
export async function logoutUser() {

    try {

        await signOut(auth);

        window.location.href = "login.html";

    } catch (error) {

        console.error(error);

        alert("Unable to logout.");
    }
}


// GET CURRENT USER ROLE
export async function getUserRole(user) {

    if (!user) {
        return null;
    }

    const userRef = doc(db, "users", user.uid);

    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        return null;
    }

    return userSnap.data().role;
}


// PROTECT ADMIN PAGE
export function protectAdminPage() {

    onAuthStateChanged(auth, async (user) => {

        if (!user) {

            window.location.href = "login.html";

            return;
        }

        const role = await getUserRole(user);

        if (role !== "admin") {

            alert("Admin access required.");

            window.location.href = "index.html";
        }
    });
}


// CHECK LOGIN
export function watchAuth(callback) {

    onAuthStateChanged(auth, async (user) => {

        if (!user) {

            callback(null, null);

            return;
        }

        const role = await getUserRole(user);

        callback(user, role);
    });
}
