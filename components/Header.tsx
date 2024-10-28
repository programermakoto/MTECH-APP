// import Link from "next/link";
// import React from "react";
// import { Button } from "./ui/button";
// import AuthServerButton from "./auth/AuthServerButton";
// import { supabaseServer } from "@/utils/supabaseServer";

// const Header = async () => {
//     const supabase = supabaseServer();
//     const { data: user } = await supabase.auth.getSession();

//     return (
//         <div className="flex flex-wrap sm:flex-nowrap py-4 px-6 border-b border-gray-200">
//             <Link href="/">
//                 <Button variant="outline" className="w-full sm:w-auto mb-2 sm:mb-0">ホーム</Button>
//             </Link>
//             {user.session && (
//                 <Link href="/dashboard" className="sm:ml-4">
//                     <Button variant="outline" className="w-full sm:w-auto mb-2 sm:mb-0">ダッシュボード</Button>
//                 </Link>
//             )}
//             <Link href="/pricing" className="sm:ml-4">
//                 <Button variant="outline" className="w-full sm:w-auto mb-2 sm:mb-0">コース一覧</Button>
//             </Link>
//             <Link href="https://mtech-it.com" className="sm:ml-4">
//                 <Button variant="outline" className="w-full sm:w-auto mb-2 sm:mb-0">Mtechコミュニティー</Button>
//             </Link>
//             <div className="ml-auto">
//                 <AuthServerButton />
//             </div>
//         </div>
//     );
// };

// export default Header;

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import AuthServerButton from "./auth/AuthServerButton";
import { supabaseServer } from "@/utils/supabaseServer";
import { Menu, X } from "react-feather"; // react-featherアイコン

const Header = async () => {
    const [isOpen, setIsOpen] = useState(false); // メニューの開閉状態
    const supabase = supabaseServer();
    const { data: user } = await supabase.auth.getSession();

    return (
        <div className="flex py-4 px-6 border-b border-gray-200">
            {/* ロゴやホームリンク */}
            <Link href="/" className="flex items-center">
                <Button variant="outline">ホーム</Button>
            </Link>

            {/* ハンバーガーメニュー */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="ml-auto sm:hidden"
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            {/* モバイル時のメニュー表示 */}
            <div className={`flex-col items-start w-full mt-4 sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
                {user.session && (
                    <Link href="/dashboard">
                        <Button variant="outline" className="mt-2 w-full">ダッシュボード</Button>
                    </Link>
                )}
                <Link href="/pricing">
                    <Button variant="outline" className="mt-2 w-full">コース一覧</Button>
                </Link>
                <Link href="https://mtech-it.com">
                    <Button variant="outline" className="mt-2 w-full">Mtechコミュニティー</Button>
                </Link>
                <div className="mt-2">
                    <AuthServerButton />
                </div>
            </div>

            {/* デスクトップ時のメニュー表示 */}
            <div className="hidden sm:flex sm:ml-4 sm:items-center">
                {user.session && (
                    <Link href="/dashboard">
                        <Button variant="outline" className="ml-4">ダッシュボード</Button>
                    </Link>
                )}
                <Link href="/pricing" className="ml-4">
                    <Button variant="outline">コース一覧</Button>
                </Link>
                <Link href="https://mtech-it.com" className="ml-4">
                    <Button variant="outline">Mtechコミュニティー</Button>
                </Link>
                <div className="ml-4">
                    <AuthServerButton />
                </div>
            </div>
        </div>
    );
};

export default Header;
