import os

with open(r'k:\claude\Touch-and-go-frontend\app\candidate\page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace lines 260 to 578 (from {/* Top Banner & Profile Overview */} to {/* 2. PROFILE & EXPERIENCE TAB */})
marker_start = "{/* Top Banner & Profile Overview */}"
marker_end = "{/* 2. PROFILE & EXPERIENCE TAB */}"

idx_start = text.find(marker_start)
idx_end = text.find(marker_end)

if idx_start == -1 or idx_end == -1:
    print(f"Error: markers not found! start={idx_start}, end={idx_end}")
    exit(1)

new_middle = '''{/* 1. Clean, Minimal Editorial Profile Header */}
      <div className="bg-white border border-[#E2DDD3] rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(26,40,56,0.04)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Identity Section */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#141413] text-white flex items-center justify-center font-black text-2xl font-display shadow-2xs shrink-0 border border-[#E8E2D8]">
              {candidateRecord.identity.fullName.charAt(0)}
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-[#141413] font-display">
                  {candidateRecord.identity.fullName}
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Open to Opportunities</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#74726A] font-medium">
                {candidateRecord.profile.headline}
              </p>
              <div className="flex items-center gap-3 text-xs text-[#74726A] mt-1 flex-wrap font-mono">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#769FCD]" />
                  <span>{candidateRecord.profile.location || "Bengaluru, India"}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#769FCD]" />
                  <span>ATS Score: <strong className="text-[#141413] font-black">94%</strong></span>
                </span>
                <span>•</span>
                <span className="text-[#769FCD] font-bold">1-Touch Stealth Active</span>
              </div>
            </div>
          </div>

          {/* Profile Health Mini-Panel */}
          <div className="flex flex-col gap-2.5 min-w-[280px] bg-[#FAF7F2] p-4.5 rounded-2xl border border-[#E8E2D8]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#141413] font-bold font-display">Profile Readiness</span>
              <span className="font-mono font-black text-[#769FCD]">{profileScore}%</span>
            </div>
            <div className="w-full bg-[#E8E2D8] rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#769FCD] h-2 rounded-full transition-all duration-500"
                style={{ width: `${profileScore}%` }}
              />
            </div>
            <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-[#74726A]">
              <span>Applications: <strong className="text-[#141413]">{applications.length}</strong></span>
              <span>Saved: <strong className="text-[#141413]">{savedJobIds.length}</strong></span>
              <span className="text-[#769FCD] font-bold">Matched: {matchedJobs.length}</span>
            </div>
          </div>
        </div>

        {/* Minimalist Workflow Progression Track */}
        <div className="mt-6 pt-5 border-t border-[#E8E2D8]">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-mono font-bold text-[11px] uppercase tracking-wider text-[#74726A] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#769FCD] fill-[#769FCD]" />
              Candidate Progression Pipeline
            </span>
            <span className="text-[11px] font-mono text-[#74726A]">Tap stage to jump</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {workflowSteps.map((stepItem) => {
              const isActive = currentStep === stepItem.step;
              return (
                <button
                  key={stepItem.step}
                  onClick={() => {
                    setCurrentStep(stepItem.step);
                    setActiveTab(stepItem.tab as any);
                  }}
                  className={`flex flex-col text-left p-3 rounded-2xl border transition-all text-xs cursor-pointer ${
                    isActive
                      ? "bg-[#141413] border-[#141413] text-white shadow-xs"
                      : "bg-[#FAF7F2] border-[#E8E2D8] text-[#5A5850] hover:border-[#769FCD] hover:text-[#141413]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isActive ? "bg-white/20 text-white" : "bg-white text-[#74726A] border border-[#E8E2D8]"
                    }`}>
                      0{stepItem.step}
                    </span>
                    {isActive ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#769FCD]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D8D2C6]" />
                    )}
                  </div>
                  <span className="font-bold text-xs mt-0.5">{stepItem.label}</span>
                  <span className={`text-[10px] truncate mt-0.5 ${isActive ? "text-white/70" : "text-[#74726A]"}`}>
                    {stepItem.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Clean Streamlined Tab Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none p-1.5 rounded-2xl bg-white border border-[#E8E2D8] shadow-2xs">
        {[
          { id: "overview", label: "Overview & Launchpad", icon: <BarChart3 className="w-4 h-4" /> },
          { id: "profile", label: "Profile & Experience", icon: <User className="w-4 h-4" /> },
          { id: "resume", label: "Resume Hub", icon: <FileText className="w-4 h-4" /> },
          { id: "jobs", label: "Job Search & Apply", icon: <Search className="w-4 h-4" /> },
          { id: "agent", label: "Candidate AI Agent", icon: <Bot className="w-4 h-4" />, badge: "6 Agents" },
          { id: "matching", label: "AI Job Matching", icon: <Sparkles className="w-4 h-4" /> },
          { id: "interview", label: "AI Interviewer", icon: <Mic className="w-4 h-4" /> },
          { id: "rag", label: "RAG Assistant", icon: <BrainCircuit className="w-4 h-4" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#141413] text-white shadow-xs"
                  : "text-[#74726A] hover:text-[#141413] hover:bg-[#FAF7F2]"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                  isActive ? "bg-[#769FCD] text-white" : "bg-[#D6E6F2] text-[#141413] border border-[#B9D7EA]"
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT AREAS */}

      {/* 1. OVERVIEW & LAUNCHPAD TAB */}
      {activeTab === "overview" && (
        <div className="flex flex-col gap-8">
          {/* Top Trio Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Match Engine */}
            <div className="bg-white border border-[#E2DDD3] hover:border-[#769FCD] rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(26,40,56,0.04)] hover:shadow-[0_12px_32px_rgba(118,159,205,0.12)] transition-all hover:-translate-y-0.5 flex flex-col justify-between gap-5 group">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#74726A]">
                    AI Match Engine
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#D6E6F2] border border-[#B9D7EA] flex items-center justify-center text-[#769FCD] group-hover:scale-105 transition-transform">
                    <Sparkles className="w-4.5 h-4.5" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-[#141413] font-display mt-1">
                  {matchedJobs.length} High-Match Jobs
                </h3>
                <p className="text-xs text-[#5A5850] leading-relaxed">
                  Roles exceeding 85% criteria vector overlap based on your verified tech stack.
                </p>
              </div>
              <button
                className="w-full py-2.5 rounded-xl bg-[#141413] hover:bg-[#769FCD] text-white font-extrabold text-xs shadow-[2px_2px_0px_#769FCD] hover:shadow-[3px_3px_0px_#5E8BBF] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                onClick={() => setActiveTab("jobs")}
              >
                <span>Browse Matched Jobs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2: Autonomous Agent */}
            <div className="bg-white border border-[#E2DDD3] hover:border-[#769FCD] rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(26,40,56,0.04)] hover:shadow-[0_12px_32px_rgba(118,159,205,0.12)] transition-all hover:-translate-y-0.5 flex flex-col justify-between gap-5 group">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#74726A]">
                    Autonomous Agent
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#D6E6F2] border border-[#B9D7EA] flex items-center justify-center text-[#769FCD] group-hover:scale-105 transition-transform">
                    <Bot className="w-4.5 h-4.5" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-[#141413] font-display mt-1">
                  Candidate AI Agent
                </h3>
                <p className="text-xs text-[#5A5850] leading-relaxed">
                  6 coordinated sub-agents executing profile sync, resume ATS optimization, and match screening.
                </p>
              </div>
              <button
                className="w-full py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#D6E6F2] text-[#141413] border border-[#E8E2D8] hover:border-[#769FCD] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                onClick={() => setActiveTab("agent")}
              >
                <span>Launch Agent Console</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#769FCD]" />
              </button>
            </div>

            {/* Card 3: Interactive Prep */}
            <div className="bg-white border border-[#E2DDD3] hover:border-[#769FCD] rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(26,40,56,0.04)] hover:shadow-[0_12px_32px_rgba(118,159,205,0.12)] transition-all hover:-translate-y-0.5 flex flex-col justify-between gap-5 group">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#74726A]">
                    Interactive Prep
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#D6E6F2] border border-[#B9D7EA] flex items-center justify-center text-[#769FCD] group-hover:scale-105 transition-transform">
                    <Mic className="w-4.5 h-4.5" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-[#141413] font-display mt-1">
                  AI Interview Simulator
                </h3>
                <p className="text-xs text-[#5A5850] leading-relaxed">
                  Practice STAR interview questions with real-time feedback, speech analysis, and scoring.
                </p>
              </div>
              <button
                className="w-full py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#D6E6F2] text-[#141413] border border-[#E8E2D8] hover:border-[#769FCD] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                onClick={() => setActiveTab("interview")}
              >
                <span>Start Practice Session</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#769FCD]" />
              </button>
            </div>
          </div>

          {/* Quick Action Navigation Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Candidate Profile",
                desc: "Personal info, experience, education & skills CRUD",
                icon: <User className="w-4.5 h-4.5 text-[#769FCD]" />,
                tab: "profile",
              },
              {
                title: "Resume Manager",
                desc: "Upload, view, download, replace & delete resume",
                icon: <FileText className="w-4.5 h-4.5 text-[#769FCD]" />,
                tab: "resume",
              },
              {
                title: "Job Search & Apply",
                desc: "Filter by location, job type, salary & skills",
                icon: <Search className="w-4.5 h-4.5 text-[#769FCD]" />,
                tab: "jobs",
              },
              {
                title: "RAG Career Assistant",
                desc: "RAG-grounded candidate Q&A knowledge base",
                icon: <BrainCircuit className="w-4.5 h-4.5 text-[#769FCD]" />,
                tab: "rag",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white border border-[#E2DDD3] hover:border-[#769FCD] rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between gap-4 group"
                onClick={() => setActiveTab(feature.tab as any)}
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] group-hover:bg-[#D6E6F2]/40 transition-colors">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-[#141413] font-display group-hover:text-[#769FCD] transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-[#5A5850] mt-1 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-[#769FCD] font-mono font-bold pt-2 border-t border-[#E8E2D8]/60">
                  <span>Open Tool</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Recent Applications Tracker */}
          <div className="bg-white border border-[#E2DDD3] rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(26,40,56,0.04)] flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
              <div className="flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-[#769FCD]" />
                <h3 className="font-black text-base text-[#141413] font-display">
                  Application Tracking Pipeline
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-[#74726A]">
                Total Applied: <strong className="text-[#141413]">{applications.length}</strong>
              </span>
            </div>

            {applications.length === 0 ? (
              <div className="p-8 text-center bg-[#FAF7F2] rounded-2xl border border-dashed border-[#E8E2D8] flex flex-col items-center gap-3">
                <p className="text-xs text-[#74726A] font-medium">No job applications submitted yet.</p>
                <button
                  className="px-4 py-2 rounded-xl bg-[#141413] hover:bg-[#769FCD] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  onClick={() => setActiveTab("jobs")}
                >
                  Explore Jobs &amp; Apply
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-2xl border border-[#E8E2D8] bg-[#FAF7F2] hover:border-[#769FCD] flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#141413] text-white flex items-center justify-center font-black text-sm font-display">
                        {app.jobTitle.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#141413]">{app.jobTitle}</h4>
                        <p className="text-xs font-mono text-[#74726A]">
                          {app.organizationName} • Applied {formatRelativeTime(app.appliedAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs px-3 py-1 rounded-full font-mono font-bold bg-[#D6E6F2] text-[#141413] border border-[#B9D7EA]">
                        {app.stage.toUpperCase()}
                      </span>
                      <button
                        className="px-3.5 py-1.5 rounded-xl border border-[#E8E2D8] hover:border-[#769FCD] bg-white text-xs font-bold text-[#141413] transition-colors cursor-pointer"
                        onClick={() => router.push(`/candidate/applications`)}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      '''

updated_text = text[:idx_start] + new_middle + text[idx_end:]

# Replace remaining border-[#B9D7EA] with border-[#E8E2D8] in the rest of the file
updated_text = updated_text.replace("border-[#B9D7EA]", "border-[#E8E2D8]")
updated_text = updated_text.replace("text-[#1A2838]", "text-[#141413]")

with open(r'k:\claude\Touch-and-go-frontend\app\candidate\page.tsx', 'w', encoding='utf-8') as f:
    f.write(updated_text)

print("Candidate page.tsx updated successfully")

