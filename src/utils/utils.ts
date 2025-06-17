export class Utils {
    static parseDate(dateStr: string): Date {
        const tanggal = dateStr.split(" ")[1];
        const [day, month, year] = tanggal.split("-").map(Number);
        return new Date(year, month - 1, day);
    };
}