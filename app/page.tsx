"use client"
import Image from "next/image";
import { useState } from 'react';
import Smiley from './smiley';

export default function Home() {
  const [text1, setText1] = useState('小树向你发送了一封对象邀请函');
  const [text2, setText2] = useState('小树希望你成为ta的对象，是否接受？');
  // 处理接受按钮点击
  const handleAccept = () => {
    setText1('恭喜你们成为对象！');
    setText2('小树非常开心，祝你们幸福快乐！');
  };

  // 处理拒绝按钮点击
  const handleReject = () => {
    setText1('很遗憾你们没有情缘');
    setText2('小树比较惋惜，祝你们各自幸福！');
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ol className="mx-auto w-fit list-inside list-decimal text-[30px]/6 text-center sm:text-center font-[family-name:var(--font-geist-mono)]">
          <a className="mb-2 tracking-[-.02em]">
            {text1} {/* 绑定第一个文本状态 */}
          </a>
        </ol>
        <ol className="mx-auto w-fit list-inside list-decimal text-[20px]/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <a className="mb-2 tracking-[-.02em]">
            {text2} {/* 绑定第二个文本状态 */}
          </a>
        </ol>
        
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button // 改为 button 元素
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto cursor-pointer"
            onClick={handleAccept} // 添加点击事件
          >
            接受
          </button>
          <div className="mx-auto w-fit flex items-center flex-col sm:flex-row">
            <Smiley />
          </div>
          <button // 改为 button 元素
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto cursor-pointer"
            onClick={handleReject} // 添加点击事件
          >
            拒绝
          </button>
        </div>
      </main>
    </div>
  );
}
