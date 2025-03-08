export function validation(data) {
  const errors = [];

  if (!data.fName || !data.fName.trim() === "") {
    errors.push("First Name is required");
  }

  if (!data.lName || !data.lName.trim() === "") {
    errors.push("Last Name is required");
  }

  if (!data.jobTitle || !data.jobTitle.trim() === "") {
    errors.push("Job title is required");
  }

  if (!data.company || !data.company.trim() === "") {
    errors.push("Company is required");
  }

  if (!data.linkedIn || !data.linkedIn.trim() === "") {
    errors.push("LinkedIn is required");
  }

  if (!data.email || !data.email.trim() === "") {
    errors.push("Email is required");
  }

  if ((!data.pastMeeting || data.pastMeeting.trim() === "" ) || (data.pastMeeting.trim() !== "other" && data.pastMeeting.trim() !== "hackathon" && data.pastMeeting.trim() !== "job-fair" && data.pastMeeting.trim() !== "tech-conference" && data.pastMeeting.trim() !== "college-club")) {
    errors.push("Meeting invalid");
  }else if (data.pastMeeting.trim() === "other") {
    if (data.otherMeet.trim() === "") {
      errors.push("Please specify other meeting");
    }
  }

  if (!data.message || !data.message.trim() === "") {
    errors.push("Message is required");
  }

  if (data.mailingList && data.mailingList.trim() !== "yes") {
    errors.push("Invalid mailing type");
  }

  if (!data.emailFormat || (data.emailFormat.trim() !== "html" && data.emailFormat.trim() !== "text")) {
    errors.push("Invalid email format");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
