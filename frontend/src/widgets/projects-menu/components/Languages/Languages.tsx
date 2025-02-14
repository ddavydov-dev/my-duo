import { useState } from 'react'
// import { Form } from "@remix-run/react";
import {
  ActiveLanguageButton,
  ActiveLanguageContainer,
  LanguagesItem,
  LanguagesInput,
  LanguagesContainer,
  LanguagesList,
  LanguagesAddBtn
} from './lib'
// import { Language } from "@prisma/client";

export default function Languages({
  onOverlay,
  languages
}: {
  onOverlay: Function
  languages: Language[]
}) {
  const [showWindow, setShowWindow] = useState(false)
  const [isNewLanguage, setIsNewLanguage] = useState(false)

  const activeLanguage = languages?.find(item => item.active)

  function showModal() {
    onOverlay(true)
    setShowWindow(true)
  }

  function hideModal() {
    onOverlay(false)
    setShowWindow(false)
  }

  return (
    <>
      <ActiveLanguageButton type="button" onMouseEnter={showModal} onMouseLeave={hideModal}>
        {activeLanguage?.title}
      </ActiveLanguageButton>

      <ActiveLanguageContainer onMouseEnter={showModal} onMouseLeave={hideModal}>
        {showWindow && (
          <LanguagesContainer>
            <LanguagesList>
              {languages?.map((item, idx: number) => (
                <li
                  key={idx}
                  style={{
                    backgroundColor: item.active ? 'rgb(221, 244, 255)' : 'inherit',
                    order: item.active ? 0 : 1,
                    borderRadius: item.active ? '10px 10px 0 0' : 0
                  }}
                >
                  <Form method="post">
                    <input type="hidden" name="id" value={item.id} readOnly />
                    <LanguagesItem type="submit">{item.title}</LanguagesItem>
                  </Form>
                </li>
              ))}
            </LanguagesList>
            <fieldset style={{ position: 'relative' }}>
              {isNewLanguage ? (
                <Form method="post">
                  <LanguagesInput
                    type="text"
                    placeholder="Enter title"
                    name="newLanguage"
                    onChange={showModal}
                    autoComplete="off"
                    required
                  />
                  <LanguagesAddBtn>+</LanguagesAddBtn>
                </Form>
              ) : (
                <LanguagesItem
                  type="button"
                  onClick={() => setIsNewLanguage(true)}
                  style={{
                    color: 'rgb(175, 175, 175)',
                    fontSize: 14,
                    padding: '13px 20px',
                    borderBottom: 'none'
                  }}
                >
                  Add a new course
                </LanguagesItem>
              )}
            </fieldset>
          </LanguagesContainer>
        )}
      </ActiveLanguageContainer>
    </>
  )
}
