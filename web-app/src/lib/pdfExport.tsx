import React from "react";
import { GeneratedPaper } from "@/types/assignment";

const DIFFICULTY_COLORS: Record<string, { text: string; bg: string }> = {
  Easy: { text: "rgb(34, 197, 94)", bg: "rgba(34, 197, 94, 0.1)" },
  Moderate: { text: "rgb(245, 158, 11)", bg: "rgba(245, 158, 11, 0.1)" },
  Challenging: { text: "rgb(229, 57, 53)", bg: "rgba(229, 57, 53, 0.1)" },
};

export async function exportToPdf(paper: GeneratedPaper): Promise<void> {
  if (typeof window === "undefined") return;

  // Dynamically import @react-pdf/renderer to avoid Node.js SSR build issues in Next.js
  const { pdf, Document, Page, Text, View, StyleSheet } = await import("@react-pdf/renderer");

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: "Helvetica",
      fontSize: 10.5,
      color: "#1A1A1A",
      backgroundColor: "#ffffff",
    },
    schoolName: {
      fontSize: 18,
      fontFamily: "Helvetica-Bold",
      textAlign: "center",
      marginBottom: 6,
    },
    subHeader: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 4,
      color: "#1A1A1A",
    },
    classHeader: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 16,
      color: "#1A1A1A",
    },
    metaRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 14,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#EBEBEB",
    },
    metaText: {
      fontSize: 11,
      color: "#1A1A1A",
    },
    rules: {
      fontSize: 11,
      fontFamily: "Helvetica-Bold",
      marginBottom: 16,
      color: "#1A1A1A",
    },
    studentInfoContainer: {
      marginBottom: 20,
      width: "100%",
    },
    studentInfoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 6,
    },
    studentInfoLabel: {
      fontSize: 11,
      color: "#1A1A1A",
      width: 100,
    },
    studentInfoLine: {
      flex: 1,
      borderBottomWidth: 1,
      borderBottomColor: "#1A1A1A",
      height: 12,
      maxWidth: 200,
    },
    sectionContainer: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 14,
      fontFamily: "Helvetica-Bold",
      textAlign: "center",
      marginBottom: 6,
      color: "#1A1A1A",
    },
    sectionQuestionsHeader: {
      fontSize: 12,
      fontFamily: "Helvetica-Bold",
      color: "#1A1A1A",
      marginBottom: 2,
    },
    sectionInstruction: {
      fontSize: 11,
      fontStyle: "italic",
      color: "#4B4B4B",
      marginBottom: 10,
    },
    questionRow: {
      flexDirection: "row",
      marginBottom: 12,
    },
    questionNumber: {
      fontSize: 11,
      width: 20,
      color: "#1A1A1A",
    },
    questionContent: {
      flex: 1,
    },
    questionHeaderRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 4,
    },
    difficultyTag: {
      fontSize: 8.5,
      fontFamily: "Helvetica-Bold",
      borderRadius: 4,
      paddingVertical: 1,
      paddingHorizontal: 6,
      marginRight: 6,
    },
    questionText: {
      fontSize: 11,
      color: "#1A1A1A",
      flex: 1,
    },
    marksText: {
      fontSize: 10,
      fontFamily: "Helvetica-Bold",
      color: "#888888",
      marginLeft: 4,
    },
    optionsList: {
      paddingLeft: 10,
      marginTop: 4,
    },
    optionRow: {
      flexDirection: "row",
      marginBottom: 2,
    },
    optionLetter: {
      fontSize: 10.5,
      width: 15,
      color: "#4B4B4B",
    },
    optionText: {
      fontSize: 10.5,
      color: "#4B4B4B",
    },
    endOfPaper: {
      textAlign: "center",
      fontFamily: "Helvetica-Bold",
      fontSize: 11,
      marginTop: 15,
      marginBottom: 20,
    },
    answerKeyContainer: {
      borderTopWidth: 2,
      borderTopColor: "#1A1A1A",
      paddingTop: 15,
      marginTop: 10,
    },
    answerKeyTitle: {
      fontFamily: "Helvetica-Bold",
      fontSize: 12,
      color: "#1A1A1A",
      marginBottom: 8,
    },
    answerRow: {
      flexDirection: "row",
      marginBottom: 4,
    },
    answerNumber: {
      fontSize: 11,
      width: 20,
      color: "#4B4B4B",
    },
    answerText: {
      fontSize: 11,
      color: "#4B4B4B",
      flex: 1,
    },
  });

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* School Heading */}
        <Text style={styles.schoolName}>{paper.school}</Text>
        <Text style={styles.subHeader}>Subject: {paper.subject}</Text>
        <Text style={styles.classHeader}>Class: {paper.class}</Text>

        {/* Meta row */}
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>Time Allowed: {paper.timeAllowed}</Text>
          <Text style={styles.metaText}>Maximum Marks: {paper.maxMarks}</Text>
        </View>

        {/* Rules */}
        <Text style={styles.rules}>
          All questions are compulsory unless stated otherwise.
        </Text>

        {/* Student Info */}
        <View style={styles.studentInfoContainer}>
          {["Name", "Roll Number", "Class"].map((field) => (
            <View key={field} style={styles.studentInfoRow}>
              <Text style={styles.studentInfoLabel}>{field}:</Text>
              <View style={styles.studentInfoLine} />
            </View>
          ))}
        </View>

        {/* Sections */}
        {paper.sections.map((section, sIdx) => (
          <View key={sIdx} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionQuestionsHeader}>Questions</Text>
            <Text style={styles.sectionInstruction}>{section.instruction}</Text>

            {/* Questions List */}
            {section.questions.map((question, qIdx) => {
              const diffStyle = DIFFICULTY_COLORS[question.difficulty] ?? {
                text: "#888888",
                bg: "rgba(136, 136, 136, 0.1)",
              };

              return (
                <View key={qIdx} style={styles.questionRow}>
                  <Text style={styles.questionNumber}>{qIdx + 1}.</Text>
                  <View style={styles.questionContent}>
                    <View style={styles.questionHeaderRow}>
                      <Text
                        style={[
                          styles.difficultyTag,
                          {
                            color: diffStyle.text,
                            backgroundColor: diffStyle.bg,
                          },
                        ]}
                      >
                        {question.difficulty}
                      </Text>
                      <Text style={styles.questionText}>{question.text}</Text>
                      {question.marks && (
                        <Text style={styles.marksText}>
                          [{question.marks} Mark{question.marks > 1 ? "s" : ""}]
                        </Text>
                      )}
                    </View>

                    {/* MCQ Options */}
                    {question.options && question.options.length > 0 && (
                      <View style={styles.optionsList}>
                        {question.options.map((opt, oIdx) => {
                          const optionLetter = String.fromCharCode(97 + oIdx); // a, b, c, d
                          return (
                            <View key={oIdx} style={styles.optionRow}>
                              <Text style={styles.optionLetter}>{optionLetter}.</Text>
                              <Text style={styles.optionText}>{opt}</Text>
                            </View>
                          );
                        })}
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        ))}

        {/* End of paper */}
        <Text style={styles.endOfPaper}>End of Question Paper</Text>

        {/* Answer Key */}
        <View style={styles.answerKeyContainer}>
          <Text style={styles.answerKeyTitle}>Answer Key:</Text>
          {paper.answerKey.map((ans, aIdx) => (
            <View key={aIdx} style={styles.answerRow}>
              <Text style={styles.answerNumber}>{aIdx + 1}.</Text>
              <Text style={styles.answerText}>{ans.text}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  try {
    const docBlob = await pdf(<MyDocument />).toBlob();
    const url = URL.createObjectURL(docBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${paper.school.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_assignment.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to generate PDF:", error);
  }
}
