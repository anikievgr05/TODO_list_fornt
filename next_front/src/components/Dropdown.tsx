import React, { ReactNode } from 'react';
import { Menu, Transition } from '@headlessui/react';

type DropdownProps = {
    width?: number;
    trigger: ReactNode;
    children: ReactNode;
    contentClasses?: string;
    align?: 'right' | 'left' | 'top';
    onOpenChange?: (open: boolean) => void; // Новый пропс для отслеживания состояния
};

const Dropdown = ({
                      align = 'right',
                      width = 48,
                      contentClasses = 'py-1 bg-white',
                      trigger,
                      children,
                      onOpenChange, // Добавляем колбэк для отслеживания состояния
                  }: DropdownProps) => {
    let alignmentClasses: string;

    switch (align) {
        case 'left':
            alignmentClasses = 'origin-top-left left-0';
            break;
        case 'top':
            alignmentClasses = 'origin-top';
            break;
        case 'right':
        default:
            alignmentClasses = 'z-50 origin-top-right right-0';
            break;
    }

    return (
        <Menu as="div" className="relative">
            {/* Используем onOpenChange для отслеживания состояния */}
            {({ open }) => {
                if (onOpenChange) {
                    onOpenChange(open); // Вызываем колбэк при изменении состояния
                }

                return (
                    <>
                        <Menu.Button as={React.Fragment}>{trigger}</Menu.Button>

                        <Transition
                            show={open}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95">
                            <div
                                className={`absolute z-50 mt-2 w-${width} rounded-md shadow-lg ${alignmentClasses}`}>
                                <Menu.Items
                                    className={`rounded-md focus:outline-none ring-1 ring-black ring-opacity-5 ${contentClasses}`}
                                    static>
                                    {children}
                                </Menu.Items>
                            </div>
                        </Transition>
                    </>
                );
            }}
        </Menu>
    );
};

export default Dropdown;