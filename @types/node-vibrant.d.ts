/* declare module "node-vibrant" {
  interface Palette {
    Vibrant: Color;
    LightVibrant: Color;
    DarkVibrant: Color;
    Muted: Color;
    LightMuted: Color;
    DarkMuted: Color;
  }

  interface Color {
    rgb: [number, number, number];
    hex: string;
  }

  class Vibrant {
    static from(image: string | HTMLImageElement): Promise<Vibrant>;
    getPalette(): Promise<Palette>;
  }

  export default Vibrant;
}
 */