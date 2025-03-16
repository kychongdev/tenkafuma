import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  BedDouble,
  BicepsFlexed,
  Flower,
  Heart,
  Star,
  Sword,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Controller, UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { CharFilterDrawer } from "./CharFilterDrawer";
import { Checkbox } from "@/components/ui/checkbox";
import { CharacterTeam } from "../(battle)/types/Select";

interface CharStatsInputsProps {
  position: 0 | 1 | 2 | 3 | 4;
  useForm: UseFormReturn<CharacterTeam>;
  char: string;
}

export const CharStatsSelect = ({
  useForm,
  position,
  char,
}: CharStatsInputsProps) => {
  const t = useTranslations("Team");
  const { register, control, setValue } = useForm;
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Enter",
      "Tab",
      "Control",
      "Meta",
    ];
    if (
      (e.key >= "0" && e.key <= "9") ||
      (allowedKeys.includes(e.key) && // Allow specified keys
        !(e.ctrlKey || e.metaKey))
    ) {
      return;
    }
    e.preventDefault();
  };
  const handleKeyDownAllowDot = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Enter",
      "Tab",
      ".",
      "Control",
      "Meta",
    ];
    if (
      (e.key >= "0" && e.key <= "9") ||
      (allowedKeys.includes(e.key) && // Allow specified keys
        !(e.ctrlKey || e.metaKey))
    ) {
      return;
    }
    e.preventDefault();
  };

  return (
    <Card className="w-full">
      <CardContent className="p-3">
        <div className="grid grid-cols-4">
          <div className="col-span-1">
            <CharFilterDrawer
              useForm={useForm}
              position={position}
              char={char}
            />
          </div>
          <div className="col-span-3 grid grid-cols-1">
            <div className="flex-grow grid grid-cols-2 gap-2 ml-2">
              <div className="relative h-10 w-full">
                <Heart className="absolute left-2 top-[45%] transform -translate-y-1/2 text-gray-500 z-10" />
                <Input
                  type="text"
                  placeholder={t("HP")}
                  className="pl-9 py-2 text-md w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6E23DD] focus:border-transparent"
                  onKeyDown={handleKeyDownAllowDot}
                  {...register(`${position}.hpPot`, {
                    onChange: (e) => {
                      if (e.target.value > 100) {
                        setValue(`${position}.hpPot`, 100);
                      }
                      if (e.target.value === "") {
                        setValue(`${position}.hpPot`, 0);
                      }
                      setValue(`${position}.hpPot`, parseInt(e.target.value));
                    },
                  })}
                />

                <div className="absolute left-[80%] top-[45%] transform -translate-y-1/2 text-gray-500 z-10">
                  %
                </div>
              </div>

              <div className="relative h-10 w-full">
                <Sword className="absolute left-2 top-[45%] transform -translate-y-1/2 text-gray-500 z-10" />
                <Input
                  type="text"
                  placeholder={t("ATK")}
                  className="pl-9 py-2 text-md w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6E23DD] focus:border-transparent"
                  onKeyDown={handleKeyDownAllowDot}
                  {...register(`${position}.atkPot`, {
                    onChange: (e) => {
                      if (e.target.value > 100) {
                        setValue(`${position}.atkPot`, 100);
                      }
                      if (e.target.value === "") {
                        setValue(`${position}.atkPot`, 0);
                      }
                      setValue(`${position}.atkPot`, parseInt(e.target.value));
                    },
                  })}
                />

                <div className="absolute left-[80%] top-[45%] transform -translate-y-1/2 text-gray-500 z-10">
                  %
                </div>
              </div>
            </div>

            <div className="flex-grow grid grid-cols-3 gap-2 ml-2">
              <div className="relative h-10 w-full">
                <div className="absolute left-2 top-[45%] transform -translate-y-1/2 text-gray-500 z-10">
                  Lvl
                </div>
                <Input
                  type="text"
                  placeholder={t("LVL")}
                  className="pl-9 py-2 text-md w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6E23DD] focus:border-transparent"
                  onKeyDown={handleKeyDown}
                  {...register(`${position}.level`, {
                    onChange: (e) => {
                      if (e.target.value > 60) {
                        e.target.value = 60;
                      }
                      if (e.target.value[0] === "0") {
                        e.target.value = e.target.value.slice(1);
                      }
                    },
                  })}
                />
              </div>
              <div className="relative h-10 w-full">
                <Star className="absolute left-2 top-[45%] transform -translate-y-1/2 text-gray-500 z-10" />
                <FormField
                  control={control}
                  name={`${position}.stars`}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(e) => field.onChange(parseInt(e))}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="pl-9 py-2 text-md text-gray-500">
                            <SelectValue placeholder={t("STAR")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <div className="relative h-10 w-full">
                <Flower className="absolute left-2 top-[45%] transform -translate-y-1/2 text-gray-500 z-10" />
                <FormField
                  control={control}
                  name={`${position}.bond`}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(e) => field.onChange(parseInt(e))}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="pl-9 py-2 text-md text-gray-500">
                            <SelectValue placeholder={t("BOND")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex-grow grid grid-cols-3 gap-2 ml-2">
              <div className="relative h-10 w-full">
                <BicepsFlexed className="absolute left-2 top-[45%] transform -translate-y-1/2 text-gray-500 z-10" />
                <FormField
                  control={control}
                  name={`${position}.lib`}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(e) => field.onChange(parseInt(e))}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="pl-9 py-2 text-md text-gray-500">
                            <SelectValue placeholder={t("LIB")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="0">0</SelectItem>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <div className="relative h-10 w-full">
                <BedDouble className="absolute left-2 top-[45%] transform -translate-y-1/2 text-gray-500 z-10" />

                <FormField
                  control={control}
                  name={`${position}.discipline`}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(e) => field.onChange(parseInt(e))}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="pl-9 py-2 text-md text-gray-500">
                            <SelectValue placeholder={t("ROOM")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="0">0</SelectItem>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="relative h-10 w-full">
                <Controller
                  control={useForm.control}
                  name={`${position}.isPot6`}
                  render={({ field }) => (
                    <Toggle
                      type="button"
                      className="data-[state=off]:bg-red-300 data-[state=on]:bg-green-300 "
                      variant="outline"
                      aria-label="Toggle passive4"
                      pressed={field.value}
                      onPressedChange={field.onChange}
                      // {...register(`${position}.isPot6`)}
                    >
                      <div className="text-black">{t("PASSIVE4")}</div>
                    </Toggle>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
