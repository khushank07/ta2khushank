import { TEACHING_AND_EXAM_SCHEME } from '../data/syllabus';

export function ExaminationSchemeTable() {
  const { teaching, examination, notes } = TEACHING_AND_EXAM_SCHEME;

  return (
    <section id="exam-scheme" aria-labelledby="exam-scheme-heading" className="scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
        <h2
          id="exam-scheme-heading"
          className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-[#1A2028]"
        >
          Teaching and Examination Scheme
        </h2>
        <span className="font-mono text-xs text-[#5B6068] tabular-nums">
          Total Marks: {examination.total} · Credits: {teaching.C}
        </span>
      </div>

      <div className="folio-sheet border border-[#DCD8CE] rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-center text-sm text-[#1D2024] min-w-[740px]">
            <thead>
              <tr className="bg-[#F2EFE8] border-b border-[#DCD8CE] font-medium text-[#1A2028]">
                <th colSpan={5} className="py-2.5 px-3 border-r border-[#DCD8CE] font-semibold">
                  Teaching Scheme
                </th>
                <th colSpan={9} className="py-2.5 px-3 font-semibold">
                  Examination Scheme
                </th>
              </tr>

              <tr className="bg-[#F7F5F0] border-b border-[#DCD8CE] text-xs font-medium text-[#2C3138]">
                <th rowSpan={4} className="py-2 px-3 border-r border-[#DCD8CE] w-12">
                  L
                </th>
                <th rowSpan={4} className="py-2 px-3 border-r border-[#DCD8CE] w-12">
                  T
                </th>
                <th rowSpan={4} className="py-2 px-3 border-r border-[#DCD8CE] w-12">
                  P
                </th>
                <th rowSpan={4} className="py-2 px-3 border-r border-[#DCD8CE] w-12">
                  C
                </th>
                <th rowSpan={4} className="py-2 px-3 border-r border-[#DCD8CE] w-14">
                  TCH
                </th>
                <th colSpan={6} className="py-2 px-3 border-r border-[#DCD8CE]">
                  Theory
                </th>
                <th colSpan={2} className="py-2 px-3 border-r border-[#DCD8CE]">
                  Practical
                </th>
                <th rowSpan={4} className="py-2 px-3 w-20">
                  Total
                </th>
              </tr>

              <tr className="bg-[#FAF9F5] border-b border-[#DCD8CE] text-xs font-medium text-[#2C3138]">
                <th colSpan={4} className="py-2 px-3 border-r border-[#DCD8CE]">
                  Internal Exams
                </th>
                <th colSpan={2} className="py-2 px-3 border-r border-[#DCD8CE]">
                  University Exams
                </th>
                <th colSpan={2} className="py-2 px-3 border-r border-[#DCD8CE]">
                  University Exams (LPW)
                </th>
              </tr>

              <tr className="bg-[#FAF9F5] border-b border-[#DCD8CE] text-[12px] text-[#454A52]">
                <th colSpan={2} className="py-1.5 px-2 border-r border-[#DCD8CE] font-medium">
                  TA-1 &amp; TA-2
                </th>
                <th colSpan={2} className="py-1.5 px-2 border-r border-[#DCD8CE] font-medium">
                  MSE
                </th>
                <th rowSpan={2} className="py-1.5 px-2 border-r border-[#DCD8CE] font-medium">
                  Marks
                </th>
                <th rowSpan={2} className="py-1.5 px-2 border-r border-[#DCD8CE] font-medium">
                  Hrs
                </th>
                <th rowSpan={2} className="py-1.5 px-2 border-r border-[#DCD8CE] font-medium">
                  Marks
                </th>
                <th rowSpan={2} className="py-1.5 px-2 border-r border-[#DCD8CE] font-medium">
                  Hrs
                </th>
              </tr>

              <tr className="bg-[#FAF9F5] border-b border-[#DCD8CE] text-[12px] text-[#5B6068]">
                <th className="py-1.5 px-2 border-r border-[#DCD8CE] font-normal">Marks</th>
                <th className="py-1.5 px-2 border-r border-[#DCD8CE] font-normal">Hrs</th>
                <th className="py-1.5 px-2 border-r border-[#DCD8CE] font-normal">Marks</th>
                <th className="py-1.5 px-2 border-r border-[#DCD8CE] font-normal">Hrs</th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-[#FCFBF8] font-mono text-sm tabular-nums text-[#1A2028]">
                <td className="py-3.5 px-3 border-r border-[#E6E3DA]">{teaching.L}</td>
                <td className="py-3.5 px-3 border-r border-[#E6E3DA]">{teaching.T}</td>
                <td className="py-3.5 px-3 border-r border-[#E6E3DA]">{teaching.P}</td>
                <td className="py-3.5 px-3 border-r border-[#E6E3DA] font-medium">{teaching.C}</td>
                <td className="py-3.5 px-3 border-r border-[#DCD8CE]">{teaching.TCH}</td>
                <td className="py-3.5 px-3 border-r border-[#E6E3DA]">{examination.theory.internal.ta.marks}</td>
                <td className="py-3.5 px-3 border-r border-[#E6E3DA]">{examination.theory.internal.ta.hrs}</td>
                <td className="py-3.5 px-3 border-r border-[#E6E3DA]">{examination.theory.internal.mse.marks}</td>
                <td className="py-3.5 px-3 border-r border-[#E6E3DA]">{examination.theory.internal.mse.hrs}</td>
                <td className="py-3.5 px-3 border-r border-[#E6E3DA] font-medium">
                  {examination.theory.university.marks}
                </td>
                <td className="py-3.5 px-3 border-r border-[#DCD8CE]">{examination.theory.university.hrs}</td>
                <td className="py-3.5 px-3 border-r border-[#E6E3DA] text-[#7A7F87]">
                  {examination.practical.universityLpw.marks}
                </td>
                <td className="py-3.5 px-3 border-r border-[#DCD8CE] text-[#7A7F87]">
                  {examination.practical.universityLpw.hrs}
                </td>
                <td className="py-3.5 px-3 font-semibold text-[#1D3557]">{examination.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3 space-y-1 text-xs leading-relaxed text-[#575C64]">
        {notes.map((note) => (
          <p key={note}>{note}</p>
        ))}
      </div>
    </section>
  );
}
