import React from 'react';

import { useCreateMessageCard } from './hooks/useCreateMessageCard';

import { MessageCard } from '../MessageCard';

import { CreateMessageCardGenerateButtons } from './components/CreateMessageCardGenerateButtons';

import { ButtonHelper } from '@/helpers/buttons/ButtonHelper';
import { AlertMessage } from '@/helpers/AlertMessage';
import { Loading } from '@/helpers/Loading';

import { strings, words } from '@/texts';

export function CreateMessageCard() {
  const {
    text,
    message,
    createMessageErrorMessage,
    createMessagePending,
    resetCreateMessage,
    handleTextareaKeyDown,
    handleTextareaChange,
    handleAnalyzeMessage,
    generateMessageContentErrorMessage,
    generateMessageContentPending,
    handleGenerateNeutralMessageContent,
    handleGeneratePositiveMessageContent,
    handleGenerateNegativeMessageContent,
  } = useCreateMessageCard();

  return (
    <div className="w-full">
      {!message ? (
        <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg w-full">
          <div className="text-center text-lg font-semibold">
            {strings.generateACustomerMessage}
          </div>
          <CreateMessageCardGenerateButtons
            isPending={generateMessageContentPending}
            onNeutral={handleGenerateNeutralMessageContent}
            onPositive={handleGeneratePositiveMessageContent}
            onNegative={handleGenerateNegativeMessageContent}
          />
          <div className="text-center text-gray-500 mb-2">
            {strings.orEnterYourOwnText}
          </div>
          <div>
            <div className="relative mb-4">
              <Loading
                className="absolute inset-0 flex text-gray-400 bg-gray-900 bg-opacity-10"
                loaded={!generateMessageContentPending}
                iconClassName="m-auto size-16 animate-spin"
              />
              <textarea
                className="w-full block h-36 p-2 border border-gray-300 rounded"
                placeholder={strings.enterYourMessageHere}
                autoFocus
                value={text}
                onChange={handleTextareaChange}
                onKeyDown={handleTextareaKeyDown}
              />
            </div>
            <ButtonHelper
              className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-blue-600"
              text={words.analyze}
              disabled={!text || generateMessageContentPending}
              loading={createMessagePending}
              onClick={handleAnalyzeMessage}
            />
            <AlertMessage
              message={
                createMessageErrorMessage || generateMessageContentErrorMessage
              }
            />
          </div>
        </div>
      ) : null}

      {message ? (
        <>
          <MessageCard message={message} />
          <ButtonHelper
            className="mt-4 w-full bg-gray-700 text-gray-100 py-2 rounded hover:bg-gray-800"
            text={words.reset}
            onClick={resetCreateMessage}
          />
        </>
      ) : null}
    </div>
  );
}
