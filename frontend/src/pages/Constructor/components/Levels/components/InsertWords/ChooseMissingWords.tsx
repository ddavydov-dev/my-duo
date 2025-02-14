import { useState } from "react";
import { VariantItem } from "~/modules/Skill/components/lib";
import { VariantItemInput } from "../lib";

export default function ChooseMissingWords({ words }) {
  const [variants, setVariants] = useState(() =>
    words.length ? [...words] : [""]
  );

  return (
    <div style={{ width: "100%" }}>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          margin: "30px 0",
          display: words.length > 1 ? "flex" : "block",
          flexWrap: "wrap",
        }}
      >
        {words.length === 1 ? (
          <>
            <li>
              <VariantItem
                type="button"
                isFocused={false}
                onClick={() => setVariants((prevVars) => [...prevVars, ""])}
              >
                Add variant
              </VariantItem>
            </li>
            {variants.map((variant, idx) => (
              <VariantItemInput
                key={`insertwordvariant${idx}`}
                type="text"
                // name={`variant${number}`}
                placeholder="type variant"
                defaultValue={variant}
                required
              />
            ))}
          </>
        ) : (
          words.map((word, idx: number) => (
            <li
              key={idx}
              style={{ position: "relative", marginBottom: 8, marginRight: 16 }}
            >
              <VariantItem type="button" isFocused={false}>
                {word}
              </VariantItem>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
