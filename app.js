(() => {
  "use strict";

  const CFG = window.EARTH_HERO_CONFIG || { API_URL: "", BRANCHES: [] };
  const OTHER_BRANCH = "อื่น ๆ";
  const MAX_SCORE = 120;

  const stages = [
    {
      name: "ศูนย์การค้า",
      badge: "🏬",
      summary: "คุณช่วยลดพลังงาน พลาสติก และขยะในศูนย์การค้าได้สำเร็จ",
      sceneId: "sceneMall",
      tasks: [
        {
          type: "hotspot",
          group: "mall-lights",
          count: 2,
          title: "ปิดไฟในพื้นที่ที่ไม่มีคน",
          prompt: "แตะหลอดไฟทั้ง 2 ดวงในโซนว่าง เพื่อช่วยประหยัดพลังงาน",
          success: "เยี่ยมมาก! ปิดไฟโซนว่างครบแล้ว ช่วยลดการใช้พลังงานโดยไม่จำเป็น"
        },
        {
          type: "choice",
          title: "ลดพลาสติกใช้ครั้งเดียว",
          prompt: "ลูกค้ากำลังซื้อเครื่องดื่ม คุณจะแนะนำตัวเลือกใด?",
          choices: [
            { icon: "🥤", label: "รับแก้วและหลอดพลาสติกใหม่ทุกครั้ง", correct: false },
            { icon: "🫗", label: "ใช้แก้วส่วนตัวหรือแก้วที่ใช้ซ้ำได้", correct: true },
            { icon: "🛍️", label: "รับถุงพลาสติกเพิ่มเพื่อถือแก้ว", correct: false }
          ],
          success: "ถูกต้อง! การใช้แก้วซ้ำช่วยลดขยะพลาสติกได้ทันที"
        },
        {
          type: "choice",
          title: "แยกขวดพลาสติกให้ถูกต้อง",
          prompt: "ขวดน้ำพลาสติกที่เทน้ำออกแล้วควรทิ้งที่ใด?",
          choices: [
            { icon: "♻️", label: "ถังหรือจุดรับขวดพลาสติกรีไซเคิล", correct: true },
            { icon: "🍌", label: "ถังเศษอาหาร", correct: false },
            { icon: "☣️", label: "ถังขยะอันตราย", correct: false }
          ],
          success: "ถูกต้อง! ขวดสะอาดมีโอกาสถูกนำกลับไปรีไซเคิลได้"
        }
      ]
    },
    {
      name: "บ้าน",
      badge: "🏡",
      summary: "คุณช่วยลดไฟ ลดน้ำ และจัดการขยะในบ้านได้สำเร็จ",
      sceneId: "sceneHome",
      tasks: [
        {
          type: "choice",
          title: "ลดพลังงานในบ้าน",
          prompt: "โทรทัศน์ไม่ได้ใช้งานหลายชั่วโมง ควรทำอย่างไร?",
          choices: [
            { icon: "🔌", label: "ปิดเครื่องและถอดปลั๊กเมื่อไม่ใช้งาน", correct: true },
            { icon: "📺", label: "เปิดหน้าจอทิ้งไว้", correct: false },
            { icon: "💡", label: "เปิดไฟเพิ่มให้ห้องสว่าง", correct: false }
          ],
          success: "ถูกต้อง! ปิดและถอดปลั๊กช่วยลดไฟฟ้าที่สูญเปล่า"
        },
        {
          type: "choice",
          title: "ใช้น้ำอย่างรู้คุณค่า",
          prompt: "ระหว่างแปรงฟันควรทำอย่างไร?",
          choices: [
            { icon: "🚰", label: "ปิดก๊อกระหว่างแปรงฟัน", correct: true },
            { icon: "💦", label: "เปิดน้ำไหลตลอดเวลา", correct: false },
            { icon: "🛁", label: "เปิดน้ำใส่อ่างจนเต็ม", correct: false }
          ],
          success: "ดีมาก! ปิดก๊อกช่วยประหยัดน้ำได้ทุกวัน"
        },
        {
          type: "choice",
          title: "จัดการเศษอาหาร",
          prompt: "เปลือกกล้วยและเศษผักควรแยกไปที่ใด?",
          choices: [
            { icon: "🌱", label: "ถังเศษอาหาร เพื่อนำไปทำปุ๋ย", correct: true },
            { icon: "♻️", label: "ถังขวดแก้ว", correct: false },
            { icon: "🔋", label: "ถังขยะอันตราย", correct: false }
          ],
          success: "ถูกต้อง! เศษอาหารสามารถนำไปทำปุ๋ยและลดขยะฝังกลบได้"
        }
      ]
    },
    {
      name: "สวนสาธารณะ",
      badge: "🌳",
      summary: "คุณทำให้สวนสะอาดขึ้น ปลูกต้นไม้ และช่วยสัตว์ได้สำเร็จ",
      sceneId: "scenePark",
      tasks: [
        {
          type: "hotspot",
          group: "park-trash",
          count: 5,
          title: "เก็บขยะในสวน",
          prompt: "แตะขยะที่อยู่บนพื้นให้ครบทั้ง 5 ชิ้น",
          success: "สวนสะอาดขึ้นแล้ว! ขยะไม่หลุดลงแหล่งน้ำและไม่ทำอันตรายสัตว์"
        },
        {
          type: "hotspot",
          group: "park-plant",
          count: 3,
          title: "เพิ่มพื้นที่สีเขียว",
          prompt: "แตะจุดวงกลมทั้ง 3 จุดเพื่อปลูกต้นไม้ใหม่",
          success: "ยอดเยี่ยม! ต้นไม้ใหม่ช่วยเพิ่มร่มเงาและดูดซับคาร์บอนไดออกไซด์"
        },
        {
          type: "choice",
          title: "ช่วยสัตว์อย่างปลอดภัย",
          prompt: "พบกระรอกติดห่วงพลาสติก ควรทำอย่างไร?",
          choices: [
            { icon: "📞", label: "แจ้งเจ้าหน้าที่หรือผู้เชี่ยวชาญให้ช่วยอย่างปลอดภัย", correct: true },
            { icon: "🏃", label: "วิ่งไล่จับสัตว์ทันที", correct: false },
            { icon: "📸", label: "ถ่ายรูปแล้วเดินจากไป", correct: false }
          ],
          success: "ถูกต้อง! การแจ้งผู้เชี่ยวชาญช่วยลดความเสี่ยงทั้งต่อคนและสัตว์"
        }
      ]
    },
    {
      name: "ชายหาด",
      badge: "🏖️",
      summary: "คุณช่วยเก็บขยะทะเล แยกรีไซเคิล และป้องกันขยะลงทะเลได้สำเร็จ",
      sceneId: "sceneBeach",
      tasks: [
        {
          type: "hotspot",
          group: "beach-trash",
          count: 6,
          title: "เก็บขยะทะเล",
          prompt: "แตะขยะบนชายหาดให้ครบทั้ง 6 ชิ้นก่อนถูกคลื่นพัดลงทะเล",
          success: "ชายหาดสะอาดแล้ว! คุณช่วยลดอันตรายต่อเต่า ปลา และสัตว์ทะเล"
        },
        {
          type: "choice",
          title: "แยกขยะรีไซเคิล",
          prompt: "สิ่งใดควรแยกเข้าสู่ระบบรีไซเคิลเมื่อสะอาดและแห้ง?",
          choices: [
            { icon: "🧴", label: "ขวดพลาสติกและกระป๋องเครื่องดื่ม", correct: true },
            { icon: "🍜", label: "เศษอาหารเปียก", correct: false },
            { icon: "🧻", label: "กระดาษทิชชู่ใช้แล้ว", correct: false }
          ],
          success: "ถูกต้อง! วัสดุสะอาดและแห้งมีโอกาสรีไซเคิลได้มากขึ้น"
        },
        {
          type: "choice",
          title: "ป้องกันขยะไหลลงทะเล",
          prompt: "ควรทำอย่างไรกับท่อระบายน้ำใกล้ชายหาด?",
          choices: [
            { icon: "🛡️", label: "ติดตั้งตะแกรงหรือเครื่องดักขยะก่อนออกสู่ทะเล", correct: true },
            { icon: "➡️", label: "ปล่อยขยะไหลตามน้ำไป", correct: false },
            { icon: "🗑️", label: "เทขยะเพิ่มลงในท่อ", correct: false }
          ],
          success: "สำเร็จ! ระบบดักขยะช่วยหยุดขยะก่อนเข้าสู่ทะเล"
        }
      ]
    }
  ];

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const screens = $$(".screen");
  const state = {
    player: null,
    stageIndex: 0,
    taskIndex: 0,
    completedStages: 0,
    score: 0,
    taskClicks: 0,
    startedAt: 0,
    muted: false,
    records: []
  };

  const branchSelect = $("#branch");
  const otherBranchField = $("#otherBranchField");
  const otherBranchInput = $("#otherBranch");
  const formError = $("#formError");

  function showScreen(id) {
    screens.forEach(s => s.classList.toggle("active", s.id === id));
    window.scrollTo(0, 0);
  }

  function populateBranches() {
    (Array.isArray(CFG.BRANCHES) ? CFG.BRANCHES : []).forEach(branch => {
      const option = document.createElement("option");
      option.value = branch;
      option.textContent = branch;
      branchSelect.appendChild(option);
    });
  }

  function updateOtherBranch() {
    const show = branchSelect.value === OTHER_BRANCH;
    otherBranchField.classList.toggle("hidden", !show);
    otherBranchInput.required = show;
    if (!show) otherBranchInput.value = "";
  }

  function sanitizePhone(value) {
    return String(value || "").replace(/\D/g, "").slice(0, 10);
  }

  function beep(kind = "good") {
    if (state.muted) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = kind === "good" ? "sine" : "triangle";
      osc.frequency.value = kind === "good" ? 660 : 210;
      gain.gain.setValueAtTime(.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(.15, ctx.currentTime + .02);
      gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + .25);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + .27);
    } catch (_) {}
  }

  function apiConfigured() {
    return /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec/.test(String(CFG.API_URL || "").trim());
  }

  async function sendToSheets(payload) {
    if (!apiConfigured()) return { ok: false, skipped: true };
    const response = await fetch(CFG.API_URL, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    const text = await response.text();
    const data = JSON.parse(text);
    if (!data.ok) throw new Error(data.message || "บันทึกไม่สำเร็จ");
    return data;
  }

  async function registerPlayer(player) {
    const status = $("#reportStatus");
    if (!apiConfigured()) {
      status.textContent = "เล่นได้ทันที • ยังไม่ได้ตั้งค่า Google Sheets";
      return;
    }
    status.textContent = "กำลังบันทึกข้อมูล...";
    try {
      await sendToSheets({ action: "register", game: "Earth Hero Mission", ...player });
      status.textContent = "บันทึกข้อมูลเรียบร้อย";
    } catch (_) {
      status.textContent = "เล่นต่อได้ แต่ยังบันทึกออนไลน์ไม่สำเร็จ";
    }
  }

  async function saveResult() {
    const status = $("#saveResultStatus");
    if (!state.player || !apiConfigured()) {
      status.textContent = apiConfigured() ? "" : "ผลลัพธ์ยังไม่ได้ส่ง เพราะยังไม่ได้ตั้งค่า Google Sheets";
      return;
    }
    status.textContent = "กำลังบันทึกผลลัพธ์...";
    try {
      await sendToSheets({
        action: "result",
        game: "Earth Hero Mission",
        ...state.player,
        score: state.score,
        maxScore: MAX_SCORE,
        completedStages: state.completedStages,
        durationSeconds: Math.max(1, Math.round((Date.now() - state.startedAt) / 1000)),
        taskSummary: state.records.join(" | ")
      });
      status.textContent = "บันทึกผลลัพธ์ลง Google Sheets แล้ว";
    } catch (_) {
      status.textContent = "ยังบันทึกออนไลน์ไม่สำเร็จ แต่คะแนนบนหน้าจอยังถูกต้อง";
    }
  }

  function startGameFlow() {
    if (state.player) showScreen("storyScreen");
    else showScreen("registerScreen");
  }

  function resetInteractiveScene() {
    $$('[data-hotspot-group]').forEach(el => {
      el.classList.remove("hotspot-active", "done");
      el.disabled = false;
    });
  }

  function updateMap() {
    const percent = Math.round((state.completedStages / stages.length) * 100);
    $("#worldPercent").textContent = `${percent}%`;
    $("#worldLeaf").textContent = percent === 100 ? "🌎" : percent >= 50 ? "🌍🌿" : "🌍";
    $("#mapScore").textContent = state.score;
    $("#playerGreeting").textContent = `${state.player?.firstName || "ฮีโร่"} พร้อมลุย!`;

    $$(".mission-card").forEach((card, index) => {
      const button = card.querySelector("button");
      const completed = index < state.completedStages;
      const unlocked = index <= state.completedStages;
      card.classList.toggle("completed", completed);
      card.classList.toggle("locked", !unlocked);
      card.classList.toggle("unlocked", unlocked);
      button.disabled = completed || !unlocked;
      button.textContent = completed ? "ผ่านแล้ว ✓" : unlocked ? "เริ่มด่าน" : "🔒 ยังไม่ปลดล็อก";
    });
  }

  function openStage(index) {
    state.stageIndex = index;
    state.taskIndex = 0;
    state.taskClicks = 0;
    resetInteractiveScene();
    const stage = stages[index];
    $("#stageNumber").textContent = `ด่านที่ ${index + 1}`;
    $("#stageTitle").textContent = stage.name;
    $("#stageScore").textContent = state.score;
    $$(".scene").forEach(scene => scene.classList.toggle("active-scene", scene.id === stage.sceneId));
    showScreen("stageScreen");
    renderTask();
  }

  function renderTask() {
    const stage = stages[state.stageIndex];
    const task = stage.tasks[state.taskIndex];
    state.taskClicks = 0;
    $("#taskCounter").textContent = `ภารกิจ ${state.taskIndex + 1}/3`;
    $("#taskType").textContent = task.type === "hotspot" ? "แตะบนภาพ" : "เลือกคำตอบ";
    $("#taskTitle").textContent = task.title;
    $("#taskPrompt").textContent = task.prompt;
    $("#stageProgressBar").style.width = `${(state.taskIndex / 3) * 100}%`;
    $("#taskFeedback").className = "task-feedback hidden";
    $("#taskFeedback").textContent = "";
    $("#nextTaskButton").classList.add("hidden");
    $("#choiceArea").innerHTML = "";
    $("#taskProgress").classList.toggle("hidden", task.type !== "hotspot");

    $$('[data-hotspot-group]').forEach(el => el.classList.remove("hotspot-active"));

    if (task.type === "choice") {
      task.choices.forEach((choice, idx) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "choice-button";
        button.innerHTML = `<span>${choice.icon}</span><b>${choice.label}</b>`;
        button.addEventListener("click", () => handleChoice(button, choice, task));
        $("#choiceArea").appendChild(button);
      });
    } else {
      const matches = $$(`[data-hotspot-group="${task.group}"]`);
      matches.forEach(el => {
        el.classList.add("hotspot-active");
        el.onclick = () => handleHotspot(el, task);
      });
      updateHotspotProgress(0, task.count);
    }
  }

  function handleChoice(button, choice, task) {
    const feedback = $("#taskFeedback");
    if (choice.correct) {
      beep("good");
      $$(".choice-button").forEach(b => b.disabled = true);
      button.classList.add("correct");
      completeTask(task, feedback);
    } else {
      beep("bad");
      button.classList.add("wrong");
      feedback.className = "task-feedback bad";
      feedback.textContent = "ยังไม่ใช่ ลองเลือกใหม่อีกครั้งนะ";
      window.setTimeout(() => button.classList.remove("wrong"), 450);
    }
  }

  function handleHotspot(el, task) {
    if (el.classList.contains("done")) return;
    beep("good");
    el.classList.add("done");
    el.classList.remove("hotspot-active");
    state.taskClicks += 1;
    updateHotspotProgress(state.taskClicks, task.count);
    if (state.taskClicks >= task.count) {
      const feedback = $("#taskFeedback");
      completeTask(task, feedback);
    }
  }

  function updateHotspotProgress(done, total) {
    const wrap = $("#taskProgress");
    wrap.style.setProperty("--progress", `${Math.round((done / total) * 100)}%`);
    wrap.querySelector("b").textContent = `${done}/${total}`;
  }

  function completeTask(task, feedback) {
    feedback.className = "task-feedback good";
    feedback.textContent = task.success;
    state.score = Math.min(MAX_SCORE, state.score + 10);
    state.records.push(`${stages[state.stageIndex].name}: ${task.title}`);
    $("#stageScore").textContent = state.score;
    $("#stageProgressBar").style.width = `${((state.taskIndex + 1) / 3) * 100}%`;
    $("#nextTaskButton").textContent = state.taskIndex === 2 ? "จบด่าน" : "ภารกิจถัดไป";
    $("#nextTaskButton").classList.remove("hidden");
  }

  function nextTask() {
    if (state.taskIndex < 2) {
      state.taskIndex += 1;
      renderTask();
      return;
    }
    finishStage();
  }

  function finishStage() {
    const stage = stages[state.stageIndex];
    if (state.stageIndex >= state.completedStages) {
      state.completedStages = Math.min(stages.length, state.stageIndex + 1);
    }
    $("#stageBadge").textContent = stage.badge;
    $("#stageCompleteTitle").textContent = `ผ่านด่าน${stage.name}!`;
    $("#stageCompleteText").textContent = stage.summary;
    $("#completeScore").textContent = state.score;
    $("#returnMapButton").textContent = state.completedStages >= stages.length ? "ดูผลลัพธ์" : "ไปด่านถัดไป";
    showScreen("stageCompleteScreen");
  }

  function showFinalResult() {
    $("#finalScore").textContent = state.score;
    $("#resultPlayer").textContent = `${state.player?.firstName || "ฮีโร่"} ${state.player?.surname || ""}`.trim();
    showScreen("resultScreen");
    saveResult();
  }

  function resetRun() {
    state.stageIndex = 0;
    state.taskIndex = 0;
    state.completedStages = 0;
    state.score = 0;
    state.records = [];
    state.startedAt = Date.now();
    resetInteractiveScene();
    updateMap();
    showScreen("mapScreen");
  }

  $("#startButton").addEventListener("click", startGameFlow);
  $("#howButton").addEventListener("click", () => showScreen("howScreen"));
  $("#howStartButton").addEventListener("click", startGameFlow);
  $("#storyNextButton").addEventListener("click", () => {
    state.startedAt = Date.now();
    updateMap();
    showScreen("mapScreen");
  });
  $("#nextTaskButton").addEventListener("click", nextTask);
  $("#stageBackButton").addEventListener("click", () => { updateMap(); showScreen("mapScreen"); });
  $("#returnMapButton").addEventListener("click", () => {
    if (state.completedStages >= stages.length) showFinalResult();
    else { updateMap(); showScreen("mapScreen"); }
  });
  $("#playAgainButton").addEventListener("click", resetRun);
  $("#changePlayerButton").addEventListener("click", () => {
    state.player = null;
    state.completedStages = 0;
    state.score = 0;
    state.records = [];
    $("#registrationForm").reset();
    updateOtherBranch();
    showScreen("registerScreen");
  });
  $("#soundToggle").addEventListener("click", () => {
    state.muted = !state.muted;
    $("#soundToggle").textContent = state.muted ? "🔇" : "🔊";
  });
  $$('[data-back]').forEach(btn => btn.addEventListener("click", () => showScreen(btn.dataset.back)));
  branchSelect.addEventListener("change", updateOtherBranch);
  $("#phone").addEventListener("input", e => e.target.value = sanitizePhone(e.target.value));

  $$(".mission-card").forEach(card => {
    card.querySelector("button").addEventListener("click", () => {
      const index = Number(card.dataset.stage);
      if (index === state.completedStages) openStage(index);
    });
  });

  $("#registrationForm").addEventListener("submit", async event => {
    event.preventDefault();
    formError.textContent = "";
    const firstName = $("#firstName").value.trim();
    const surname = $("#surname").value.trim();
    const employeeId = $("#employeeId").value.trim();
    const selectedBranch = branchSelect.value;
    const branch = selectedBranch === OTHER_BRANCH ? otherBranchInput.value.trim() : selectedBranch;
    const phone = sanitizePhone($("#phone").value);
    if (!firstName || !surname) return formError.textContent = "กรุณากรอกชื่อและนามสกุล";
    if (!employeeId) return formError.textContent = "กรุณากรอกรหัสพนักงาน";
    if (!selectedBranch) return formError.textContent = "กรุณาเลือกสาขา";
    if (selectedBranch === OTHER_BRANCH && !branch) return formError.textContent = "กรุณาระบุรหัสหรือชื่อสาขาอื่น ๆ";
    if (phone.length < 9) return formError.textContent = "กรุณากรอกเบอร์โทรศัพท์ให้ครบ";
    if (!$("#consent").checked) return formError.textContent = "กรุณายินยอมการบันทึกข้อมูลก่อนเริ่มเกม";

    state.player = {
      sessionId: `EH-${Date.now()}-${Math.random().toString(36).slice(2,8).toUpperCase()}`,
      firstName, surname, employeeId, branch, phone
    };
    await registerPlayer(state.player);
    showScreen("storyScreen");
  });

  populateBranches();
  updateOtherBranch();
})();
