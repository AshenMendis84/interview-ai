import React from 'react'
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import { dummyInterviews } from '@/constants';

const Page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-wrap gap-6 max-w-lg">
          <h2>AI-Powered Interviewer for choosing the best employee for your company</h2>
          <p className="text-lg">
            Real-time AI interviewer and Recruiter
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
          <Link href="/interview">Start the interview</Link>
          </Button>

        </div>

        <Image src="/robot.png" alt="robo-dude" width={400} height={400} className="max-sm:hidden" />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>New Interviews</h2>

        <div className="Interview-Section">
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id}/>
          ))}

          {/* <p>You haven&apos;t taken any interviews yet</p> */}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>

        <div className="interview-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id}/>
          ))}
        </div>
      </section>
    
    </>
  )
}

export default Page